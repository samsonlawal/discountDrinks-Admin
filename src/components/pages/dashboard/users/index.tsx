"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Tabs, { ITabItem } from "@/components/molecules/Tabs";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";
import RowActions from "./rowActions";
import { useGetUsers } from "@/hooks/api/users";

type User = {
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
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

const columns: ColumnDef<User>[] = [
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
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-medium ${
            status === "Active"
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
    accessorKey: "joined",
    header: "JOINED",
  },
  {
    id: "actions",
    header: "ACTION",
    cell: ({ row }) => (
      <RowActions category={row?.original} refresh={() => {}} />
    ),
  },
];

interface IActiveTab extends ITabItem {}

const tabsItems = (): IActiveTab[] => {
  return [
    { id: "0", title: "All" },
    { id: "1", title: "Active" },
    { id: "2", title: "Inactive" },
  ];
};

interface IQueryObject {
  search: string;
  page: number;
  activeTab: IActiveTab;
}

function UsersPage() {
  const { users, fetchUsers, loading } = useGetUsers();
  const tabsData = tabsItems();

  const [queryObject, setqueryObject] = React.useState<IQueryObject>({
    search: "",
    page: 1,
    activeTab: tabsData[0],
  });
  const activeTab = queryObject?.activeTab;

  React.useEffect(() => {
    fetchUsers({ search: queryObject.search });
  }, [queryObject.search]);

  // Transform and filter users based on search and active tab
  const transformedUsers = users.map((user: any) => ({
    ...user,
    status: user.isActive ? "Active" : "Inactive",
    joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
  }));

  const filteredUsers = transformedUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(queryObject.search.toLowerCase()) ||
      user.email?.toLowerCase().includes(queryObject.search.toLowerCase());

    const matchesTab =
      activeTab.title === "All" ||
      (activeTab.title === "Active" && user.status === "Active") ||
      (activeTab.title === "Inactive" && user.status === "Inactive");

    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout leftTitle="Users">
      <div className="px-6 min-h-full">
        <div className="bg-white overflow-hidden">
          <div className={"mt-[20px] px-1 pt-2 pb-1 flex justify-between "}>
            <Search
              value={queryObject?.search}
              onChange={(value: string) =>
                setqueryObject((x) => ({ ...x, search: value }))
              }
            />
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
            <DataTable
              columns={columns}
              data={filteredUsers}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UsersPage;
