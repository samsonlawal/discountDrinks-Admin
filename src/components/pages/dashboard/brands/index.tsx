"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./rowActions";
import AddBrandDialog from "./AddBrandDialog";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";
import { useGetBrands } from "@/hooks/api/brands";
import Tabs, { ITabItem } from "@/components/molecules/Tabs";
import { IFetchBrandQuery, IBrand } from "@/types";

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
            d="M7.66659 14.0001C3.89659 14.0001 0.833252 10.9367 0.833252 7.16675C0.833252 3.39675 3.89659 0.333415 7.66659 0.333415C11.4366 0.333415 14.4999 3.39675 14.4999 7.16675C14.4999 10.9367 11.4366 14.0001 7.66659 14.0001ZM7.66659 1.33341C4.44659 1.33341 1.83325 3.95341 1.83325 7.16675C1.83325 10.3801 4.44659 13.0001 7.66659 13.0001C10.8866 13.0001 13.4999 10.3801 13.4999 7.16675C13.4999 3.95341 10.8866 1.33341 7.66659 1.33341Z"
            fill="#868FA0"
          />
          <path
            d="M14.6666 15.1667C14.5399 15.1667 14.4133 15.12 14.3133 15.02L12.9799 13.6867C12.7866 13.4934 12.7866 13.1734 12.9799 12.98C13.1733 12.7867 13.4933 12.7867 13.6866 12.98L15.0199 14.3134C15.2133 14.5067 15.2133 14.8267 15.0199 15.02C14.9199 15.12 14.7933 15.1667 14.6666 15.1667Z"
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

interface IActiveTab extends ITabItem {}

interface IQueryObject extends IFetchBrandQuery {
  search: string;
  activeTab: IActiveTab;
}

export default function BrandsPage() {
  const { brands, fetchBrands, loading } = useGetBrands();

  const tabsData: IActiveTab[] = [
    { id: "0", title: "All" },
    { id: "1", title: "Active" },
    { id: "2", title: "Inactive" },
  ];

  const [queryObject, setQueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });

  const activeTab = queryObject?.activeTab;

  React.useEffect(() => {
    fetchBrands({ search: queryObject.search });
  }, [queryObject.search]);

  // Filter brands based on search and active tab
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name
      ?.toLowerCase()
      ?.includes(queryObject.search.toLowerCase());

    const isActive = brand.status === "active";

    const matchesTab =
      activeTab.title === "All" ||
      (activeTab.title === "Active" && isActive) ||
      (activeTab.title === "Inactive" && !isActive);

    return matchesSearch && matchesTab;
  });

  // Calculate counts for each tab
  const allCount = brands.length;
  const activeCount = brands.filter((brand) => brand.status === "active").length;
  const inactiveCount = brands.filter((brand) => brand.status !== "active").length;

  // Update tabs with counts - only show badge for active tab
  const tabsWithCounts: IActiveTab[] = [
    {
      id: "0",
      title: "All",
      badge: String(allCount),
      showBadge: activeTab.id === "0",
    },
    {
      id: "1",
      title: "Active",
      badge: String(activeCount),
      showBadge: activeTab.id === "1",
    },
    {
      id: "2",
      title: "Inactive",
      badge: String(inactiveCount),
      showBadge: activeTab.id === "2",
    },
  ];

  const columns: ColumnDef<IBrand>[] = [
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
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => <span className="">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "CREATED DATE",
      cell: ({ row }) => (
        <span>{row.original?.createdAt ? new Date(row.original?.createdAt).toLocaleDateString() : "-"}</span>
      ),
    },
    {
      id: "actions",
      header: "ACTION",
      cell: ({ row }) => (
        <RowActions brand={row?.original} refresh={() => fetchBrands()} />
      ),
    },
  ];

  return (
    <DashboardLayout leftTitle="Brands">
      <div className="px-2 md:px-6 min-h-full">
        <div className="bg-white overflow-hidden">
          <div
            className={
              "mt-[20px] px-1 pt-2 pb-1 flex gap-2 justify-between w-full items-center"
            }
          >
            <div className="hidden md:block flex-1 md:flex-none">
              <Search
                value={queryObject.search}
                onChange={(value: string) =>
                  setQueryObject((x) => ({ ...x, search: value }))
                }
              />
            </div>
            <AddBrandDialog onSave={() => fetchBrands()}>
              <button className="px-4 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Add Brand
              </button>
            </AddBrandDialog>
          </div>

          <div
            className={
              "my-[10px] relative border-t-[#EAEBF0] border-t-[1px] pt-[10px]"
            }
          >
            <div className="px-[20px]">
              <Tabs
                data={tabsWithCounts}
                activeTab={activeTab}
                onChangeTab={({ item }) => {
                  setQueryObject((x) => ({ ...x, activeTab: item }));
                }}
              />
            </div>
            <DataTable
              columns={columns}
              data={filteredBrands}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
