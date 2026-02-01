import { SelectLabel, Select, SelectContent, SelectItemButton } from '@/components/molecules/Select';
import { DebounceInput } from './DebouceInput';

const TableFilterDropDown = () => {
   const onValueChange = (value: string) => {
      console.log(`this is a value ${value}`);
   };
   return (
      <Select onValueChange={onValueChange}>
         <SelectLabel
            label="All"
            prefixIconName="filter"
            className="px-3 py-[8px] space-x-2 leading-5 shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] rounded-tl-[6px] rounded-bl-[6px] text-sm font-inter text-grey-700 tracking-[0.28px] font-medium"
         />
         <SelectContent className="top-[40px] left-0 origin-top-left mt-0 h-max">
            <SelectItemButton value="delete" id="menu-item-1" className="hover:bg-light-grey-2">
               Delete
            </SelectItemButton>
            <SelectItemButton value="edit" id="menu-item-2" className="hover:bg-light-grey-2">
               Edit
            </SelectItemButton>
            <SelectItemButton value="more" id="menu-item-3" className="hover:bg-light-grey-2">
               More
            </SelectItemButton>
         </SelectContent>
      </Select>
   );
};

const Search = ({ filteredValue, onChange }: { filteredValue: string; onChange: (value: string | number) => void }) => {
   return (
      <div className="relative w-[280px]">
         <div className="absolute left-3 top-[calc(50%-0.5rem)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.6821 11.7458C9.66576 12.5361 8.38866 13.0067 7.00167 13.0067C3.68704 13.0067 1 10.3189 1 7.00335C1 3.68779 3.68704 1 7.00167 1C10.3163 1 13.0033 3.68779 13.0033 7.00335C13.0033 8.39059 12.533 9.66794 11.743 10.6845L14.7799 13.7186C15.0731 14.0115 15.0734 14.4867 14.7806 14.7799C14.4878 15.0731 14.0128 15.0734 13.7196 14.7805L10.6821 11.7458ZM11.5029 7.00335C11.5029 9.49002 9.48765 11.5059 7.00167 11.5059C4.5157 11.5059 2.50042 9.49002 2.50042 7.00335C2.50042 4.51668 4.5157 2.50084 7.00167 2.50084C9.48765 2.50084 11.5029 4.51668 11.5029 7.00335Z"
                  fill="#868FA0"
               />
            </svg>
         </div>

         <DebounceInput
            type="text"
            placeholder="Search"
            className="px-[calc(3rem-1px)] py-[6px] outline-none focus:outline-none shadow-[0_1px_1px_0px_rgba(0,0,0,0.10),0_0_0_1px_rgba(70,79,96,0.16)] rounded-tr-[6px] rounded-br-[6px]"
            value={filteredValue}
            onChange={(value: string | number) => onChange?.(value)}
         />
         <div className="absolute right-6 top-[calc(50%-0.5rem)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
               <rect width="16" height="16" rx="4" fill="#E9EDF5" />
               <path d="M10.5 2.5H9.20215L5.5 13.5H6.79785L10.5 2.5Z" fill="#868FA0" />
            </svg>
         </div>
      </div>
   );
};

const TableFilterSearch = ({
   filteredValue,
   onChange,
}: {
   filteredValue: string;
   onChange: (value: string | number) => void;
}) => {
   return (
      <div className="flex items-center">
         <TableFilterDropDown />
         <Search filteredValue={filteredValue} onChange={onChange} />
      </div>
   );
};

export { TableFilterSearch };
