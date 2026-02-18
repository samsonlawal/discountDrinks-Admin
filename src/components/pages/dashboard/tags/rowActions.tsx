import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { IDesignCategory, ITag } from "@/types";
import ReuseableDialog from "@/components/ReuseableDialog";
import AddTagDialog from "./AddTagDialog";
import { useDeleteTag } from "@/hooks/api/tags";

interface DataTableRowActionsProps {
  tag?: any;
  refresh?: () => void;
}

export function RowActions({ tag, refresh }: DataTableRowActionsProps) {
  const { deleteTag, loading } = useDeleteTag();

  const onDeleteTag = (closeModal?: any) => {
    deleteTag({
      data: { id: tag.id || tag._id },
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
          <button className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
            <img
              src="/icons/dots.svg"
              alt=""
              className="cursor-pointer rotate-90 w-5 h-5"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[146px] bg-white">
          <button className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
            <img
              src="/icons/eye.svg"
              alt=""
              className="cursor-pointer w-[18px] h-[18px]"
            />
            <span className="text-[#111111]">View</span>
          </button>

          <AddTagDialog tag={tag} onSave={refresh}>
            <button className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
              <img
                src="/icons/pencil.svg"
                alt=""
                className="cursor-pointer w-[18px] h-[18px]"
              />
              <span className="text-[#111111]">Edit</span>
            </button>
          </AddTagDialog>

          <ReuseableDialog
            title="Delete Tag"
            description="Are you sure you want to delete this tag?"
            proceedTitle="Delete"
            onProceed={onDeleteTag}
            loading={loading}
          >
            <button className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
              <img
                src="/icons/trash.svg"
                alt=""
                className="cursor-pointer w-[18px] h-[18px]"
              />
              <span className="text-[#111111]">Delete</span>
            </button>
          </ReuseableDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default RowActions;
