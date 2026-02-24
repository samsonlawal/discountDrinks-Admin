import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReuseableDialog from "@/components/ReuseableDialog";
import { Trash2, MoreHorizontal } from "lucide-react";
import AddBrandDialog from "./AddBrandDialog";
import { useDeleteBrand } from "@/hooks/api/brands";

interface DataTableRowActionsProps {
  brand?: any;
  refresh?: () => void;
}

export function RowActions({ brand, refresh }: DataTableRowActionsProps) {
  const { deleteBrand, loading } = useDeleteBrand();

  const onDeleteBrand = (closeModal?: any) => {
    deleteBrand({
      data: { id: brand.id || brand.brandID },
      successCallback: () => {
        refresh?.();
        closeModal?.();
      },
    });
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
        <DropdownMenuContent align="end" className="w-[146px] bg-white">

          <AddBrandDialog brand={brand} onSave={refresh}>
            <button className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
              <img
                src="/icons/pencil.svg"
                alt=""
                className="cursor-pointer w-[18px] h-[18px]"
              />
              <span className="text-[#111111]">Edit</span>
            </button>
          </AddBrandDialog>

          <ReuseableDialog
            title="Delete Brand"
            description="Are you sure you want to delete this brand?"
            proceedTitle="Delete"
            onProceed={onDeleteBrand}
            loading={loading}
          >
            <button className="hover:bg-red-50 text-red-600 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
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
