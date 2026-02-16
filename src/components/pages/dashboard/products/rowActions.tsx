import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReuseableDialog from "@/components/ReuseableDialog";
import { useDeleteProduct } from "@/hooks/api/products";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";

interface DataTableRowActionsProps {
  product: any;
  refresh?: () => void;
  onEdit?: (product: any) => void;
}

export function RowActions({
  product,
  refresh,
  onEdit,
}: DataTableRowActionsProps) {
  const { deleteProduct, loading: deleting } = useDeleteProduct();
  const [open, setOpen] = useState(false);

  const onDeleteProduct = (closeModal?: any) => {
    deleteProduct({
      data: { id: product?._id || product?.id },
      successCallback: () => {
        refresh?.();
        closeModal?.();
      },
    });
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors outline-none">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Open menu</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] bg-white p-1">
          <button className="w-full flex items-center px-2 py-1.5 gap-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer outline-none mb-1">
            <Eye className="h-4 w-4" />
            <span>View</span>
          </button>

          <button
            onClick={() => {
              onEdit?.(product);
              setOpen(false);
            }}
            className="w-full flex items-center px-2 py-1.5 gap-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer outline-none mb-1"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>

          <ReuseableDialog
            title="Delete Product"
            description={`Are you sure you want to delete "${product?.name}"?`}
            proceedTitle="Delete"
            onProceed={onDeleteProduct}
            loading={deleting}
          >
            <button className="w-full flex items-center px-2 py-1.5 gap-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </ReuseableDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default RowActions;
