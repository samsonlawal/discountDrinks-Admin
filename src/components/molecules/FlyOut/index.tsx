import { useOutsideClick } from "@/components/pages/dashboard/hooks/useOutsideClick";
import { getIcon, IconNameProps } from "@/lib/getIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  createContext,
  ReactNode,
  MouseEventHandler,
  useContext,
  useState,
  RefObject,
} from "react";

const FlyOutContext = createContext({
  isOpen: false,
  toggle: (value: boolean) => {},
});

export const FlyOut = ({ children }: { children: ReactNode }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <FlyOutContext.Provider value={{ isOpen, toggle }}>
      <div className="flex">
        <div>{children}</div>
      </div>
    </FlyOutContext.Provider>
  );
};

export const FlyOutContent = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { isOpen, toggle } = useContext(FlyOutContext);
  // const ref = useOutsideClick(() => toggle(false));
  return (
    <div
      className={cn(
        `${isOpen ? "block" : "hidden"} absolute right-0 origin-bottom-right top-4 z-50  w-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`,
        className,
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
      // ref={ref}
    >
      <div className="py-1" role="none">
        {children}
      </div>
    </div>
  );
};

export const FlyOutLabel = ({
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
  const { toggle, isOpen } = useContext(FlyOutContext);

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
        {label}
        <span>{icon}</span>
      </button>
    </div>
  );
};

export const FlyOutItemButton = ({
  children,
  id,
  onClick,
  className,
}: {
  children: ReactNode;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) => {
  const { isOpen, toggle } = useContext(FlyOutContext);
  const ref = useOutsideClick(() => toggle(false));
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
      ref={ref as RefObject<HTMLButtonElement>}
    >
      {children}
    </button>
  );
};

export const FlyOutItemLink = ({
  children,
  id,
  className,
  link,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        "inline-flex px-4 py-2 text-sm text-light-grey-g1 w-full whitespace-normal",
        className,
      )}
      role="menuitem"
      tabIndex={-1}
      id={id}
    >
      {children}
    </Link>
  );
};

export const FlyOutItem = ({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) => {
  const { toggle } = useContext(FlyOutContext);
  const ref = useOutsideClick(() => toggle(false));
  return (
    <span
      className={cn(
        "inline-flex px-4 py-2 text-sm text-light-grey-g1 w-full whitespace-nowrap",
        className,
      )}
      role="menuitem"
      tabIndex={-1}
      id={id}
      ref={ref as RefObject<HTMLButtonElement>}
    >
      {children}
    </span>
  );
};

FlyOut.FlyOutContent = FlyOutContent;
FlyOut.FlyOutItemButton = FlyOutItemButton;
FlyOut.FlyOutItemLink = FlyOutItemLink;
FlyOut.FlyOutLabel = FlyOutLabel;
FlyOut.FlyOutItem = FlyOutItem;
