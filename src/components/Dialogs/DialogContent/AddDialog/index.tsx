import { useState } from "react";
import { Dialog } from "../../index";
import { DialogName, DialogProps } from "../../types";
// import { NewCategory } from '@/components/pages/dashboard/categories/components/NewCategory';
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export const AddDialog = ({
  trigger,
  dialogName,
  mode,
  id,
  buttonClassName,
  open,
  onOpenChange,
}: DialogProps) => {
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
            <BaseModalAddDialog
              onClose={handleClose || onOpenChange}
              dialogName={dialogName}
              id={id}
              mode={mode}
            />,
            document.body,
          )
        : null}
    </>
  );
};

const BaseModalAddDialog = ({
  onClose,
  dialogName,
  mode = "Add",
  id,
}: {
  onClose: () => void;
  dialogName: DialogName;
  mode?: string;
  id?: string;
}) => {
  if (dialogName === "user") {
    return (
      <Dialog className="bg-[rgba(0,0,0,0.25)]">
        <section className="w-full max-w-[435px] flex flex-col bottom-0 overflow-y-auto bg-white rounded-3xl">
          <div className="p-8">
            <div>
              <div className="text-center">
                <div className="flex justify-between">
                  <h1 className="font-gorditta text-[#111111] text-2xl font-medium">
                    Add User
                  </h1>
                  <button
                    type="button"
                    className="select-none"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <circle
                        cx="16"
                        cy="16.0003"
                        r="13.3333"
                        stroke="#4E4E4E"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M19.3333 12.667L12.6666 19.3337M12.6666 12.667L19.3332 19.3336"
                        stroke="#4E4E4E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="my-6">
                  <form>
                    <div className="flex flex-col gap-4">
                      <div className="field max-h-[48px] relative flex-1">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`field-input  focus:outline-none cursor-text text-ellipsis overflow-hidden min-h-[48px] max-h-[48px] py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] dark:border-none rounded-lg w-full dark:bg-[#262626]`}
                          placeholder="Category Name"
                          required
                        />
                      </div>

                      <div className="flex field relative">
                        <label
                          htmlFor="parent"
                          className="field-label text-sm leading-[22px] lg:text-base text-[#838383] dark-text-[#717171] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-1.5rem)] lg:leading-6 font-normal font-gordita h-px w-px border-0 inset-0 p-0"
                        ></label>
                        <select
                          name="parent"
                          onChange={() => {}}
                          className="text-ellipsis appearance-none overflow-hidden min-h-[48px] max-h-[48px] py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] rounded-lg w-full text-sm leading-[22px] lg:text-base dark:border-none dark:bg-[#262626] focus:outline-none"
                        >
                          <option value=""> </option>
                          <option value="nigeria">Nigeria</option>
                          <option value="europe">Europe</option>
                          <option value="asia">Asia</option>
                        </select>
                        <div className="absolute w-5 h-5 outline-none border-none bg-transparent right-5 top-[calc(50%-12px)]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M15.8333 7.5L9.99996 12.5L4.16663 7.5"
                              stroke="#717171"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <div
                          className={`field-label bg-white dark:bg-transparent text-sm leading-[22px] lg:text-base text-[#838383] dark:text-[#717171] whitespace-nowrap text-ellipsis overflow-hidden pointer-events-none absolute top-[calc(50%-24px)] lg:leading-6 font-normal font-gordita translate-y-1/2 mx-3`}
                        >
                          Parent Category
                        </div>
                      </div>
                      <div className="field relative flex-1">
                        <textarea
                          id="name"
                          name="name"
                          className={`field-input  focus:outline-none cursor-text text-ellipsis overflow-hidden min-h-[100px] py-3 px-[calc(0.75rem-1px)] border-solid border-[1px] border-[#838383] dark:border-none rounded-lg w-full resize-none`}
                          placeholder="Description"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <button
                  type="button"
                  className="justify-center inline-flex flex-1 p-3 border-solid border-[1px] bg-[#111111] font-medium font-gordita text-base leading-6 text-white rounded-[1000px]"
                >
                  Add New User
                </button>
              </div>
            </div>
          </div>
        </section>
      </Dialog>
    );
  }
  // return <NewCategory onClose={onClose} mode={mode} id={id} />;
};
