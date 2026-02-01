import {
  FlyOutLabel,
  FlyOut,
  FlyOutContent,
  FlyOutItemButton,
} from "@/components/molecules/FlyOut";
import { TableFilterSearch } from "./TableFilterSearch";
import { AddDialog } from "@/components/Dialogs/DialogContent/AddDialog";

const TableFilterAction = () => {
  return (
    <div className="flex">
      <FlyOut>
        <FlyOutLabel
          label="Action"
          className="px-3 py-[6px] shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] rounded-[6px]"
        />

        <FlyOutContent>
          <FlyOutItemButton id="menu-item-1">Delete</FlyOutItemButton>
          <FlyOutItemButton id="menu-item-2">Edit</FlyOutItemButton>
          <FlyOutItemButton id="menu-item-3">More</FlyOutItemButton>
        </FlyOutContent>
      </FlyOut>
    </div>
  );
};

const TableFilter = ({
  onChange,
  filteredValue,
  total,
  label,
  title,
}: {
  filteredValue: string;
  onChange: (value: string | number) => void;
  total: number;
  label?: string;
  title?: string;
}) => {
  return (
    <div className="px-6 py-[11px] flex items-center">
      <div className="flex justify-between w-full items-center">
        {total > 0 && (
          <div className="flex gap-[10px] items-center">
            <div className="font-inter text-sm font-normal leading-5 text-grey-500">
              {total} selected
            </div>
            <TableFilterAction />
            <button type="button" className="inline-flex border-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_2967_46854)">
                  <path
                    d="M4.81798 3.75739C4.52508 3.4645 4.05021 3.4645 3.75732 3.75739C3.46442 4.05029 3.46442 4.52516 3.75732 4.81805L6.9393 8.00003L3.75735 11.182C3.46445 11.4749 3.46445 11.9497 3.75735 12.2426C4.05024 12.5355 4.52511 12.5355 4.81801 12.2426L7.99996 9.06069L11.1819 12.2427C11.4748 12.5356 11.9497 12.5356 12.2426 12.2427C12.5355 11.9498 12.5355 11.4749 12.2426 11.182L9.06062 8.00003L12.2426 4.81802C12.5355 4.52512 12.5355 4.05025 12.2426 3.75736C11.9497 3.46446 11.4749 3.46446 11.182 3.75736L7.99996 6.93937L4.81798 3.75739Z"
                    fill="#EF5466"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2967_46854">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        )}
        {title && (
          <div className="text-dark-black text-base leading-6 font-medium">
            {title}
          </div>
        )}
        <TableFilterSearch filteredValue={filteredValue} onChange={onChange} />
        {label && (
          <AddDialog
            dialogName="category"
            mode="Add"
            trigger={
              <div
                aria-label={label}
                className="inline-flex gap-[6px] px-4 py-2 rounded-[1000px] bg-dark-black text-white text-sm leading-[22px] font-medium"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.625 7.49996C10.625 7.15478 10.3451 6.87496 9.99996 6.87496C9.65478 6.87496 9.37496 7.15478 9.37496 7.49996L9.37496 9.37498H7.49996C7.15478 9.37498 6.87496 9.6548 6.87496 9.99998C6.87496 10.3452 7.15478 10.625 7.49996 10.625H9.37496V12.5C9.37496 12.8451 9.65478 13.125 9.99996 13.125C10.3451 13.125 10.625 12.8451 10.625 12.5L10.625 10.625H12.5C12.8451 10.625 13.125 10.3452 13.125 9.99998C13.125 9.6548 12.8451 9.37498 12.5 9.37498H10.625V7.49996Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99996 1.04163C5.05241 1.04163 1.04163 5.05241 1.04163 9.99996C1.04163 14.9475 5.05241 18.9583 9.99996 18.9583C14.9475 18.9583 18.9583 14.9475 18.9583 9.99996C18.9583 5.05241 14.9475 1.04163 9.99996 1.04163ZM2.29163 9.99996C2.29163 5.74276 5.74276 2.29163 9.99996 2.29163C14.2572 2.29163 17.7083 5.74276 17.7083 9.99996C17.7083 14.2572 14.2572 17.7083 9.99996 17.7083C5.74276 17.7083 2.29163 14.2572 2.29163 9.99996Z"
                      fill="white"
                    />
                  </svg>
                </div>
                {label}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export { TableFilter };
