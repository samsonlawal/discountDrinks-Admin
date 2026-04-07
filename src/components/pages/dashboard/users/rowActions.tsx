import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { IDesignCategory } from "@/types";
import ReuseableDialog from "@/components/ReuseableDialog";
import { Trash2, MoreHorizontal } from "lucide-react";

interface DataTableRowActionsProps {
  user?: any;
  isPendingUser?: boolean;
  refresh?: () => void;
  onView?: (user: any) => void;
}

export function RowActions({ user, refresh, onView }: DataTableRowActionsProps) {
  const onDeleteUser = (closeModal?: any) => {
    refresh?.();
    closeModal?.();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 flex items-center justify-center border border-transparent hover:border-gray-200 hover:bg-gray-50 rounded-full transition-colors outline-none">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36.5 bg-white">
          <button
            onClick={() => onView?.(user)}
            className="hover:bg-gray-100 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px] text-[#111111] transition-colors"
          >
            <img
              src="/icons/eye.svg"
              alt=""
              className="cursor-pointer w-4.5 h-4.5"
            />
            <span>View</span>
          </button>

          <ReuseableDialog
            title="Delete User"
            description="Are you sure you want to delete this user?"
            proceedTitle="Delete"
            onProceed={onDeleteUser}
            loading={false}
          >
            <button className="hover:bg-red-50 text-red-600 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px] transition-colors">
              <Trash2 className="h-[18px] w-[18px]" />
              <span className="text-red-600">Delete</span>
            </button>
          </ReuseableDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default RowActions;
