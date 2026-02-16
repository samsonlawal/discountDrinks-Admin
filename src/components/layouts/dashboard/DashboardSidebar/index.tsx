"use client";
import React from "react";

import {
  NAVBAR_TOP_LINKS,
  NAVBAR_BOTTOM_LINKS,
  TNavbarLinkAction,
} from "./data";
import SidebarLink from "./SidebarLink";
import Link from "next/link";
import { useLogout } from "@/hooks/api/auth";
import { useRouter } from "next/navigation";
const DashboardSidebar = () => {
  const { onLogout } = useLogout();
  const router = useRouter();

  const onClickLink = ({ action }: { action?: TNavbarLinkAction }) => {
    if (action === "logout") {
      onLogout();
      router.push("/auth/sign-in");
      return;
    }
  };

  return (
    <div
      className={`hidden md:w-[240px] h-screen shrink-0 overflow-x-hidden overflow-y-auto md:flex flex-col bg-[#111] gap-8`}
    >
      <div className="px-6 py-6">
        <Link href="/">
          <img src="/icons/logo.svg" className="object-contain" alt="logo" />
        </Link>
      </div>

      <div className="p-[24px] flex-1 flex flex-col gap-y-[50px]">
        <div className=" flex flex-col gap-1">
          {NAVBAR_TOP_LINKS.map((item) => {
            return (
              <SidebarLink
                key={item.id}
                item={item}
                onClickLink={onClickLink}
                disabled={item?.disabled}
              />
            );
          })}
        </div>

        <div className="mt-[auto]">
          {NAVBAR_BOTTOM_LINKS.map((item) => {
            return (
              <SidebarLink
                key={item.id}
                item={item}
                onClickLink={onClickLink}
                disabled={item?.disabled}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
