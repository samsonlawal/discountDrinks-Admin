import React from "react";
import { INavbarLink } from "./data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function SidebarLink({
  item,
  onClickLink,
  disabled,
  isMobile = false,
}: {
  item?: INavbarLink;
  onClickLink?: any;
  disabled?: boolean;
  isMobile?: boolean;
}) {
  const pathName = usePathname();

  const active = pathName === item?.url;

  const className = `transition duration-300 ease-in-out rounded-[8px] p-[12px] flex items-center ${
    isMobile
      ? "flex-col justify-center h-auto min-h-[50px] w-full gap-y-1 text-[10px]"
      : "flex-row h-[38px] w-full gap-x-[12px] hover:scale-105 text-[16px]"
  } hover:text-white text-[#fff] ${
    active
      ? "bg-[#292929] text-white hover:bg-[#292929]"
      : "hover:bg-[#292929]/30 hover:text-white"
  }`;

  const content = (
    <>
      <img
        src={item?.icon}
        alt="icon"
        className={cn(
          "object-contain",
          isMobile ? "w-[20px] h-[20px]" : "w-[18px] h-[18px]",
        )}
      />
      <span
        className={cn(
          "text-inherit",
          isMobile ? "text-center leading-none" : "",
        )}
      >
        {item?.title}
      </span>
    </>
  );

  if (item?.disabled)
    return (
      <button
        key={item?.id}
        className={cn(className, "cursor-not-allowed opacity-50")}
      >
        {content}
      </button>
    );

  if (item?.trigger === "url")
    return (
      <Link href={item?.url || "/"} key={item?.id} className={className}>
        {content}
      </Link>
    );

  if (item?.trigger === "action")
    return (
      <button
        onClick={() => {
          onClickLink({ action: item?.action });
        }}
        key={item?.id}
        className={className}
      >
        {content}
      </button>
    );
  else return null;
}

export default SidebarLink;
