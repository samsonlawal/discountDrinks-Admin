"use client";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import Tabs, { ITabItem } from "@/components/molecules/Tabs";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";

type Product = {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
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

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        className="w-3.5 h-3.5 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        className="w-3.5 h-3.5 rounded border-gray-300"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "PRODUCT",
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "stock",
    header: "STOCK",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "In Stock"
              ? "bg-green-100 text-green-800"
              : status === "Low Stock"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "ACTION",
    cell: () => (
      <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
        <img src="/icons/dots.svg" className="w-5 h-5" alt="" />
      </button>
    ),
  },
];

const productData: Product[] = [
  {
    name: "Premium Vodka",
    category: "Spirits",
    price: "$45.00",
    stock: 125,
    status: "In Stock",
  },
  {
    name: "Craft Beer Pack",
    category: "Beer",
    price: "$15.00",
    stock: 89,
    status: "In Stock",
  },
  {
    name: "Red Wine Bottle",
    category: "Wine",
    price: "$28.00",
    stock: 45,
    status: "Low Stock",
  },
  {
    name: "Whiskey Premium",
    category: "Spirits",
    price: "$65.00",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Champagne",
    category: "Wine",
    price: "$85.00",
    stock: 32,
    status: "In Stock",
  },
];

interface IActiveTab extends ITabItem {}

const tabsItems = (): IActiveTab[] => {
  return [
    { id: "0", title: "All" },
    { id: "1", title: "Spirits" },
    { id: "2", title: "Wine" },
    { id: "3", title: "Beer" },
  ];
};

interface IQueryObject {
  search: string;
  page: number;
  activeTab: IActiveTab;
}

function ProductsPage() {
  const tabsData = tabsItems();

  const [queryObject, setqueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });
  const activeTab = queryObject?.activeTab;

  // Filter products based on search and active tab
  const filteredProducts = productData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(queryObject.search.toLowerCase()) ||
      product.category.toLowerCase().includes(queryObject.search.toLowerCase());

    const matchesTab =
      activeTab.title === "All" || product.category === activeTab.title;

    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout leftTitle="Products">
      <div className="px-6 min-h-full">
        <div className="bg-white overflow-hidden">
          <div className={"my-[20px] px-1 py-2 flex justify-between "}>
            <Search
              value={queryObject?.search}
              onChange={(value: string) =>
                setqueryObject((x) => ({ ...x, search: value }))
              }
            />
            <button className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Add Product
            </button>
          </div>

          <div
            className={
              "my-[20px]  relative border-t-[#EAEBF0] border-t-[1px] pt-[10px]"
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
            <DataTable columns={columns} data={filteredProducts} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProductsPage;
