"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Spinner from "../Spinner";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  leftTopChild?: any;
  showFilterColumn?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  leftTopChild = null,
  showFilterColumn = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {!showFilterColumn && !leftTopChild ? null : (
        <div className="flex w-full pb-[16px] items-end justify-center ">
          {leftTopChild ? (
            <div className="flex-1 flex items-end justify-start">
              {leftTopChild}
            </div>
          ) : null}
          {!showFilterColumn ? null : (
            <div className="flex-1flex justify-end items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      )}
      {/* <div className=" border relative min-h-[440px] overflow-x-auto "> */}
      <div className=" border relative h-fit overflow-x-auto ">
        {loading ? (
          <div className=" absolute flex items-center justify-center right-0 top-0 bg-[white]/86  h-full w-full z-[20] pt-[100px]">
            <Spinner className="w-7 h-7 text-gray-600" />
          </div>
        ) : null}

        <Table className="text-[13px] w-full">
          <TableHeader className="text-xs uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isSticky = index < 3;
                  let stickyLeft = 0;
                  if (index === 1) {
                    stickyLeft = headerGroup.headers[0].getSize();
                  } else if (index === 2) {
                    stickyLeft =
                      headerGroup.headers[0].getSize() +
                      headerGroup.headers[1].getSize();
                  }

                  return (
                    <TableHead
                      key={header.id}
                      className="pl-3 whitespace-nowrap"
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                        position: isSticky ? "sticky" : undefined,
                        left: isSticky ? stickyLeft : undefined,
                        zIndex: isSticky ? 20 : undefined,
                        backgroundColor: isSticky ? "#f9fafb" : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className=""
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      const isSticky = index < 3;
                      let stickyLeft = 0;
                      if (index === 1) {
                        stickyLeft = row.getVisibleCells()[0].column.getSize();
                      } else if (index === 2) {
                        stickyLeft =
                          row.getVisibleCells()[0].column.getSize() +
                          row.getVisibleCells()[1].column.getSize();
                      }
                      return (
                        <TableCell
                          key={cell.id}
                          className="border-b border-[#e2e8f0] pl-3 whitespace-nowrap"
                          style={{
                            width: cell.column.getSize(),
                            minWidth: cell.column.getSize(),
                            position: isSticky ? "sticky" : undefined,
                            left: isSticky ? stickyLeft : undefined,
                            zIndex: isSticky ? 10 : undefined,
                            backgroundColor: isSticky ? "white" : undefined,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
export default DataTable;
