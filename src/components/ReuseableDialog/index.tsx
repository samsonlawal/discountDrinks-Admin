import React from "react";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Spinner from "@/components/molecules/Spinner";

const ReuseableDialog = ({
  title,
  description,
  onCancel,
  onProceed,
  children,
  cancelTitle = "Cancel",
  proceedTitle = "Proceed",
  loading,
}: {
  title?: string;
  description?: string;

  onCancel?: () => void;
  onProceed?: (closeModal?: any) => void;
  children?: React.ReactNode;
  cancelTitle?: string;
  proceedTitle?: string;
  loading?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);

  const close = () => {
    setOpen(false);
    onCancel?.();
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={close}>
        {React.Children.map(children, (child?: any) => {
          return React.cloneElement(child, {
            onClick: () => setOpen(true),
          });
        })}

        <AlertDialogContent className="sm:rounded-[24px]">
          <div className="p-10">
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
                    fill="#b10a0a"
                  />
                </svg>
              </div>
              <div className="mt-8 text-center">
                <h1 className="font-gorditta text-[#111111] text-2xl font-medium ">
                  {title}
                </h1>
                <div className="mt-2">
                  <div className="text-[#4e4e4e] text-base font-normal font-gordita">
                    {description}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-6 mt-8">
                <button
                  className="justify-center inline-flex flex-1 items-center py-3 px-2 border-solid border-[1px] bg-white font-medium font-gordita text-base leading-6 text-[#111111] rounded-[1000px] select-none"
                  onClick={close}
                  disabled={loading}
                >
                  {cancelTitle}
                </button>
                <button
                  type="button"
                  className="justify-center inline-flex flex-1 items-center py-3 px-2 border-solid border-[1px] bg-[#b10a0a] font-medium font-gordita text-base leading-6 text-white rounded-[1000px]"
                  onClick={() => onProceed?.(close)}
                >
                  {loading ? <Spinner /> : proceedTitle}
                </button>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReuseableDialog;
