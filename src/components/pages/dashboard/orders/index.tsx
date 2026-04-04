"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import OrdersTable from "./OrdersTable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Tabs, { ITabItem } from "@/components/molecules/Tabs";
import { IFetchTagQuery } from "@/types";
import { TableFilter } from "@/components/molecules/TableFilter";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";
import RowActions from "./rowActions";
import { useGetOrders } from "@/hooks/api/orders";
import ViewOrderDialog from "./ViewOrderDialog";
import CustomPagination from "@/components/molecules/CustomPagination";

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
  paymentStatus: string;
};

const Search = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: any) => void;
}) => {
  return (
    <div className="relative w-fit">
      <div className="absolute left-3 top-[calc(50%-0.5rem)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6821 11.7458C9.66576 12.5361 8.38866 13.0067 7.00167 13.0067C3.68704 13.0067 1 10.3189 1 7.00335C1 3.68779 3.68704 1 7.00167 1C10.3163 1 13.0033 3.68779 13.0033 7.00335C13.0033 8.39059 12.533 9.66794 11.743 10.6845L14.7799 13.7186C15.0731 14.0115 15.0734 14.4867 14.7806 14.7799C14.4878 15.0731 14.0128 15.0734 13.7196 14.7805L10.6821 11.7458ZM11.5029 7.00335C11.5029 9.49002 9.48765 11.5059 7.00167 11.5059C4.5157 11.5059 2.50042 9.49002 2.50042 7.00335C2.50042 4.51668 4.5157 2.50084 7.00167 2.50084C9.48765 2.50084 11.5029 4.51668 11.5029 7.00335Z"
            fill="#868FA0"
          />
        </svg>
      </div>

      <DebounceInput
        type="text"
        placeholder="Search"
        className="px-[calc(3rem-1px)] py-1.5 outline-none text-[#868FA0] focus:outline-none shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] w-full md:w-70 rounded-[3px]"
        value={value}
        onChange={(value: string | number) => onChange?.(value)}
      />
      <div className="absolute right-6 top-[calc(50%-0.5rem)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <rect width="16" height="16" rx="4" fill="#E9EDF5" />
          <path
            d="M10.5 2.5H9.20215L5.5 13.5H6.79785L10.5 2.5Z"
            fill="#868FA0"
          />
        </svg>
      </div>
    </div>
  );
};

const columns = (
  handleView: (order: Order) => void,
  refresh: () => void,
): ColumnDef<Order>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
        className="translate-y-[2px] z-100"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  // {
  //   id: "number",
  //   header: () => <span className="-ml-2">#</span>,
  //   cell: ({ row }) => (
  //     <span className="text-gray-600 -ml-2">{row.index + 1}</span>
  //   ),
  //   size: 20,
  // },
    {
    accessorKey: "orderId",
    header: "#",
    size: 130,
    cell: ({ row }) => {
      const orderId = row.getValue("orderId") as string;
      return (
        <span
          className={`py-0.5 rounded-md text-xs text-black font-medium`}
        >
          #{orderId}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "orderId",
  //   header: "Order ID",
  // },
  {
    accessorKey: "customer",
    header: "Customer",
    size: 200,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    size: 120,
    cell: ({ row }) => {
      const pStatus = (row.getValue("paymentStatus") as string || "").toLowerCase();
      const getPStatusColor = (status: string) => {
        switch (status) {
          case "paid":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
          case "failed":
            return "bg-rose-100 text-rose-700 border-rose-200";
          case "refunded":
            return "bg-blue-100 text-blue-700 border-blue-200";
          default:
            return "bg-amber-100 text-amber-700 border-amber-200";
        }
      };
      return (
        <span
          className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border w-fit ${getPStatusColor(pStatus)}`}
        >
          {pStatus || "Pending"}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 150,
    meta: {
      className: "",
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return `£${Number(amount || 0).toFixed(2)}`;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "pending":
            return "bg-amber-100 text-amber-700 border-amber-200";
          case "processing":
            return "bg-blue-100 text-blue-700 border-blue-200";
          case "dispatched":
            return "bg-violet-100 text-violet-700 border-violet-200";
          case "shipped":
            return "bg-indigo-100 text-indigo-700 border-indigo-200";
          case "delivered":
          case "completed":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
          case "cancelled":
            return "bg-rose-100 text-rose-700 border-rose-200";
          default:
            return "bg-gray-100 text-gray-700 border-gray-200";
        }
      };
      return (
        <span
          className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border w-fit ${getStatusColor(status)}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    header: "ACTION",
    size: 70,
    cell: ({ row }) => (
      <RowActions order={row?.original} refresh={refresh} onView={handleView} />
    ),
  },
];

interface IActiveTab extends ITabItem {}

const tabsItems = ({}: {}): IActiveTab[] => {
  return [
    { id: `0`, title: "All" },
    // { id: `1`, title: "Pending" },
    { id: `2`, title: "Processing" },
    { id: `3`, title: "Completed" },
    { id: `4`, title: "Cancelled" },
  ];
};

interface IQueryObject extends IFetchTagQuery {
  search: string;
  activeTab: IActiveTab;
  page: number;
}

function OrdersPage() {
  const tabsData = tabsItems({});
  const { orders, fetchOrders, loading, pagination } = useGetOrders();

  const [queryObject, setqueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });
  const activeTab = queryObject?.activeTab;

  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any>(undefined);

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleFetch = () => {
    const status = activeTab?.title === "All" ? undefined : activeTab?.title?.toLowerCase();
    fetchOrders({ 
      page: queryObject.page, 
      limit: 10, 
      search: queryObject.search,
      status 
    });
  }

  React.useEffect(() => {
    handleFetch();
  }, [queryObject.page, queryObject.search, queryObject.activeTab]);

  const allCount = pagination.total;
  const processingCount = orders.filter((o) => o.status === "processing").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

  const tabsWithCounts: IActiveTab[] = [
    { id: `0`, title: "All", badge: String(allCount), showBadge: activeTab?.id === "0" },
    { id: `2`, title: "Processing", badge: String(processingCount), showBadge: activeTab?.id === "2" },
    { id: `3`, title: "Completed", badge: String(completedCount), showBadge: activeTab?.id === "3" },
    { id: `4`, title: "Cancelled", badge: String(cancelledCount), showBadge: activeTab?.id === "4" },
  ];

  return (
    <DashboardLayout leftTitle="Orders">
      <div className="px-2 md:px-6 min-h-full">
        <div className="bg-white overflow-hidden flex flex-col min-h-[calc(100vh-140px)]">
          <div
            className={
              "hidden md:block mt-[20px] px-1 pt-2 flex gap-2 justify-between items-center w-full pb-4"
            }
          >
            <div className="hidden md:block flex-1 md:flex-none">
              <Search
                value={queryObject?.search}
                onChange={(value: string) =>
                  setqueryObject((x) => ({ ...x, search: value, page: 1 }))
                }
              />
            </div>
          </div>

          <div className={"md:my-[10px] my-[40px] pt-4 flex-1 flex flex-col"}>
            <div className="pb-4">
              <Tabs
                data={tabsWithCounts}
                activeTab={activeTab}
                onChangeTab={({ item }) => {
                  setqueryObject((x) => ({ ...x, activeTab: item, page: 1 }));
                }}
              />
            </div>
            
            <div className="flex-1">
              <OrdersTable 
                columns={columns(handleView, handleFetch)} 
                data={orders} 
                loading={loading}
              />
                             <CustomPagination
                  fetchedCount={orders.length}
                  totalCount={pagination.total}
                  pageSize={pagination.limit}
                  page={queryObject.page}
                  onChangePage={(val) => setqueryObject((x) => ({ ...x, page: val }))}
               />
            </div>


          </div>
        </div>
      </div>

      {selectedOrder && isViewDialogOpen && (
        <ViewOrderDialog
          open={isViewDialogOpen}
          onOpenChange={(open) => {
            setIsViewDialogOpen(open);
            if (!open) {
              setTimeout(() => setSelectedOrder(undefined), 300);
            }
          }}
          orderSummary={selectedOrder}
        />
      )}
    </DashboardLayout>
  );
}

export default OrdersPage;
