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
  order?: any; 
  refresh?: () => void;
  onView?: (order: any) => void;
}

export function RowActions({ order, refresh, onView }: DataTableRowActionsProps) {
  const [open, setOpen] = React.useState(false);

  const onDeleteOrder = (closeModal?: any) => {
    refresh?.();
    closeModal?.();
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 flex items-center justify-center border border-transparent hover:border-gray-200 hover:bg-gray-50 rounded-full transition-colors outline-none">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[146px] bg-white">
          <button 
            onClick={() => {
              onView?.(order);
              setOpen(false);
            }} 
            className="hover:bg-gray-100 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px] text-[#111111] transition-colors"
          >
            <img
              src="/icons/eye.svg"
              alt=""
              className="cursor-pointer w-[18px] h-[18px]"
            />
            <span>View</span>
          </button>
          <button className="hover:bg-gray-100 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px] text-[#111111] transition-colors">
            <img
              src="/icons/pencil.svg"
              alt=""
              className="cursor-pointer w-[18px] h-[18px]"
            />
            <span>Edit</span>
          </button>

          <ReuseableDialog
            title="Delete Order"
            description="Are you sure you want to delete this order?"
            proceedTitle="Delete"
            onProceed={onDeleteOrder}
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
