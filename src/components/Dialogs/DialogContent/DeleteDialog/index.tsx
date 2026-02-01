import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/Dialogs";
import { DialogName, DialogProps } from "@/components/Dialogs/types";
import { cn } from "@/lib/utils";

export const DeleteDialog = ({
  trigger,
  dialogName,
  buttonClassName,
  action,
  actionName,
  actionButtonLabel = "Delete",
  open,
  onOpenChange,
}: Required<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        className={cn("inline", `${buttonClassName}`)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </button>
      {isOpen || open
        ? createPortal(
            <BaseDeleteDialog
              onClose={handleClose || onOpenChange}
              dialogName={dialogName}
              action={action}
              actionName={actionName}
              actionButtonLabel={actionButtonLabel}
            />,
            document.body,
          )
        : null}
    </>
  );
};

export const BaseDeleteDialog = ({
  onClose,
  dialogName,
  action,
  actionName,
  actionButtonLabel = "Delete",
}: {
  onClose: () => void;
  action: () => Promise<void>;
  dialogName: DialogName;
  actionName: string;
  actionButtonLabel?: string;
}) => {
  return (
    <Dialog className="bg-[rgba(33,30,89,0.45)] backdrop-filter-sm">
      <section className="w-full max-w-[435px] flex flex-col bottom-0 overflow-y-auto bg-white rounded-3xl">
        <DialogContent className="p-10">
          <div>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="101"
                height="100"
                viewBox="0 0 101 100"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M92.1666 49.9997C92.1666 73.0115 73.5118 91.6663 50.4999 91.6663C27.4881 91.6663 8.83325 73.0115 8.83325 49.9997C8.83325 26.9878 27.4881 8.33301 50.4999 8.33301C73.5118 8.33301 92.1666 26.9878 92.1666 49.9997ZM50.4999 73.958C52.2258 73.958 53.6249 72.5589 53.6249 70.833V45.833C53.6249 44.1071 52.2258 42.708 50.4999 42.708C48.774 42.708 47.3749 44.1071 47.3749 45.833V70.833C47.3749 72.5589 48.774 73.958 50.4999 73.958ZM50.4999 29.1663C52.8011 29.1663 54.6666 31.0318 54.6666 33.333C54.6666 35.6342 52.8011 37.4997 50.4999 37.4997C48.1987 37.4997 46.3333 35.6342 46.3333 33.333C46.3333 31.0318 48.1987 29.1663 50.4999 29.1663Z"
                  fill="#FF9900"
                />
              </svg>
            </div>
            <div className="mt-8 text-center">
              <DialogTitle className="font-gorditta text-[#111111] text-2xl font-medium">
                {(actionName?.[0] || "").toLocaleUpperCase()}
                {actionName?.substring?.(1)}{" "}
                {dialogName === "user" ? "User" : "Category"}
              </DialogTitle>
              <div className="mt-2">
                <DialogDescription className="text-[#4e4e4e] text-base font-normal font-gordita">
                  Are you sure you want to {actionName?.toLocaleLowerCase?.()}{" "}
                  this {dialogName === "user" ? "user" : "category"}?
                </DialogDescription>
              </div>
            </div>
            <DialogFooter className=" mt-8">
              <DialogClose
                className="justify-center inline-flex flex-1 p-3 border-solid border-[1px] bg-white font-medium font-gordita text-base leading-6 text-[#111111] rounded-[1000px]"
                onClick={onClose}
              >
                Cancel
              </DialogClose>
              <button
                type="button"
                className="justify-center inline-flex flex-1 p-3 border-solid border-[1px] bg-[#111111] font-medium font-gordita text-base leading-6 text-white rounded-[1000px]"
                onClick={async () => {
                  await action?.();
                  onClose();
                }}
              >
                {actionButtonLabel}
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </section>
    </Dialog>
  );
};
