import { useOutsideClick } from "@/components/pages/dashboard/hooks/useOutsideClick";
import { getIcon, IconNameProps } from "@/lib/getIcon";
import { cn } from "@/lib/utils";
import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useState,
} from "react";

const SelectContext = createContext({
  isOpen: false,
  toggle: (value: boolean) => {},
  currentValue: "",
  setValue: (value: string) => {},
  onChange: (value: string) => {},
});

export const Select = ({
  children,
  onValueChange,
}: {
  children: ReactNode;
  onValueChange: Function;
}) => {
  const [isOpen, toggle] = useState(false);
  const [currentValue, setValue] = useState("");

  const onChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <SelectContext.Provider
      value={{ isOpen, toggle, currentValue, setValue, onChange }}
    >
      <div className="flex">
        <div className="relative">{children}</div>
      </div>
    </SelectContext.Provider>
  );
};

export const SelectContent = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { isOpen, toggle } = useContext(SelectContext);
  const ref = useOutsideClick(() => toggle(false));
  return (
    <div
      className={cn(
        `${
          isOpen ? "block" : "hidden"
        } absolute right-0 origin-bottom-right bottom-4 z-10 mt-2 w-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`,
        className,
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="py-1" role="none">
        {children}
      </div>
    </div>
  );
};

export const SelectLabel = ({
  label,
  className,
  iconName = "arrowDown",
  prefixIconName,
}: {
  label: string;
  className?: string;
  iconName?: IconNameProps;
  prefixIconName?: IconNameProps;
}) => {
  const icon = getIcon(iconName);
  const prefixIcon = getIcon(prefixIconName);
  const { toggle, isOpen, currentValue } = useContext(SelectContext);

  const onToggle = () => toggle(!isOpen);

  return (
    <div className="flex">
      <button
        type="button"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        className={cn(
          "inline-flex w-full justify-center space-x-[2px] bg-white px-3 py-2 text-sm font-normal text-light-grey-g1 leading-[22px] hover:bg-gray-50",
          className,
        )}
        onClick={onToggle}
      >
        <span>{prefixIconName && prefixIcon}</span>
        {currentValue || label}
        <span>{icon}</span>
      </button>
    </div>
  );
};

export const SelectItemButton = ({
  children,
  id,
  className,
  value,
}: {
  value: string;
  children: ReactNode;
  id?: string;
  className?: string;
}) => {
  const { setValue, toggle, isOpen, onChange } = useContext(SelectContext);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = (e.target as HTMLButtonElement).innerText;
    setValue(buttonValue);
    toggle(!isOpen);
    onChange?.(value);
  };
  return (
    <button
      className={cn(
        "inline-flex px-4 py-2 text-sm text-light-grey-g1 w-full whitespace-nowrap",
        className,
      )}
      role="menuitem"
      tabIndex={-1}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Select.SelectContent = SelectContent;
Select.SelectItemButton = SelectItemButton;
Select.SelectLabel = SelectLabel;
