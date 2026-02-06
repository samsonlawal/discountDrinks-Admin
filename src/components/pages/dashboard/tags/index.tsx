"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import DataTable from "@/components/molecules/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./rowActions";
import AddTagDialog from "./AddTagDialog";
import { DebounceInput } from "@/components/molecules/TableFilter/TableFilterSearch/DebouceInput";
import { useGetTags } from "@/hooks/api/tags";
import TagsService from "@/services/tags";

type Tag = {
  id: string;
  name: string;
  type: number;
  productCount: number;
  status: string;
  createdDate: string;
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

export default function TagsPage() {
  const [search, setSearch] = useState("");
  const { tags, fetchTags, loading } = useGetTags({ Service: TagsService });

  React.useEffect(() => {
    fetchTags({ search });
  }, [search]);

  const columns: ColumnDef<Tag>[] = [
    {
      id: "number",
      header: "#",
      cell: ({ row }) => <span className="text-gray-600">{row.index + 1}</span>,
    },
    {
      accessorKey: "name",
      header: "TAG NAME",
    },
    {
      accessorKey: "type",
      header: "TYPE",
      cell: ({ row }) => {
        const type = row.getValue("type") as number;
        return <span className="text-sm text-gray-600">{type}</span>;
      },
    },
    {
      accessorKey: "productCount",
      header: "PRODUCTS",
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
      accessorKey: "createdDate",
      header: "CREATED DATE",
    },
    {
      id: "actions",
      header: "ACTION",
      cell: ({ row }) => (
        <RowActions category={row?.original} refresh={() => fetchTags()} />
      ),
    },
  ];

  return (
    <DashboardLayout leftTitle="Tags">
      <div className="px-6 min-h-full">
        <div className="bg-white overflow-hidden">
          <div className={"mt-[20px] px-1 pt-2 pb-1 flex justify-between"}>
            <Search
              value={search}
              onChange={(value: string) => setSearch(value)}
            />
            <AddTagDialog onSave={() => fetchTags()}>
              <button className="px-4 py-2 bg-[#111111] text-white rounded-md hover:bg-gray-800 transition-colors">
                Add Tag
              </button>
            </AddTagDialog>
          </div>
          <DataTable columns={columns} data={tags} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
