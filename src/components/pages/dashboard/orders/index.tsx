"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Tabs, { ITabItem } from "@/components/molecules/Tabs";
import { IFetchTagQuery } from "@/types";
import { TableFilter } from "@/components/molecules/TableFilter";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";
import RowActions from "./rowActions";

type Order = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
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
        className="px-[calc(3rem-1px)] py-1.5 outline-none text-[#868FA0] focus:outline-none shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] w-70 rounded-[3px]"
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

const columns: ColumnDef<Order>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "number",
    header: () => <span className="-ml-2">#</span>,
    cell: ({ row }) => (
      <span className="text-gray-600 -ml-2">{row.index + 1}</span>
    ),
    size: 20,
  },
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-medium ${
            status === "Completed"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : status === "Processing"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
          }`}
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
    cell: ({ row }) => (
      <RowActions category={row?.original} refresh={() => {}} />
    ),
  },
];

const allOrderData: Order[] = [];

interface IActiveTab extends ITabItem {}

const tabsItems = ({}: {}): IActiveTab[] => {
  return [
    { id: `0`, title: "All" },
    { id: `1`, title: "Pending" },
    { id: `2`, title: "Processing" },
    { id: `3`, title: "Completed" },
    { id: `4`, title: "Cancelled", disabled: true },
  ];
};

interface IQueryObject extends IFetchTagQuery {
  search: string;
  activeTab: IActiveTab;
}

function OrdersPage() {
  const tabsData = tabsItems({});

  const [queryObject, setqueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });
  const activeTab = queryObject?.activeTab;

  // Filter orders based on search and active tab
  const filteredOrders = allOrderData.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(queryObject.search.toLowerCase()) ||
      order.id.toLowerCase().includes(queryObject.search.toLowerCase());

    const matchesTab =
      activeTab.title === "All" || order.status === activeTab.title;

    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout leftTitle="Orders">
      <div className="px-3 md:px-6 min-h-full">
        <div className="bg-white overflow-hidden">
          <div
            className={
              "mt-[20px] px-1 pt-2 pb-1 flex justify-between w-full items-center"
            }
          >
            <div className="hidden md:block">
              <Search
                value={queryObject?.search}
                onChange={(value: string) =>
                  setqueryObject((x) => ({ ...x, search: value }))
                }
              />
            </div>
            {/* <AddNewTag refresh={refresh}>
              <button className="inline-flex gap-[6px] px-4 py-2 rounded-[1000px] bg-dark-black text-white text-sm leading-[22px] font-medium">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.625 7.49996C10.625 7.15478 10.3451 6.87496 9.99996 6.87496C9.65478 6.87496 9.37496 7.15478 9.37496 7.49996L9.37496 9.37498H7.49996C7.15478 9.37498 6.87496 9.6548 6.87496 9.99998C6.87496 10.3452 7.15478 10.625 7.49996 10.625H9.37496V12.5C9.37496 12.8451 9.65478 13.125 9.99996 13.125C10.3451 13.125 10.625 12.8451 10.625 12.5L10.625 10.625H12.5C12.8451 10.625 13.125 10.3452 13.125 9.99998C13.125 9.6548 12.8451 9.37498 12.5 9.37498H10.625V7.49996Z"
                      fill="white"
                      fillOpacity="0.8"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99996 1.04163C5.05241 1.04163 1.04163 5.05241 1.04163 9.99996C1.04163 14.9475 5.05241 18.9583 9.99996 18.9583C14.9475 18.9583 18.9583 14.9475 18.9583 9.99996C18.9583 5.05241 14.9475 1.04163 9.99996 1.04163ZM2.29163 9.99996C2.29163 5.74276 5.74276 2.29163 9.99996 2.29163C14.2572 2.29163 17.7083 5.74276 17.7083 9.99996C17.7083 14.2572 14.2572 17.7083 9.99996 17.7083C5.74276 17.7083 2.29163 14.2572 2.29163 9.99996Z"
                      fill="white"
                      fillOpacity="0.8"
                    />
                  </svg>
                </div>
                New Tag
              </button>
            </AddNewTag> */}
          </div>

          <div
            className={
              "my-[10px]  relative border-t-[#EAEBF0] border-t-[1px] pt-[10px]"
            }
          >
            <div className="px-[20px]">
              <Tabs
                data={tabsData}
                activeTab={activeTab}
                onChangeTab={({ item }) => {
                  setqueryObject((x) => ({ ...x, activeTab: item }));
                }}
              />
            </div>
            <DataTable columns={columns} data={filteredOrders} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrdersPage;
