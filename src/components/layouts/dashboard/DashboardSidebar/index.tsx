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
    <>
      {/* Desktop Sidebar */}
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111] z-50 px-4 py-2 flex items-center justify-around border-t border-[#292929]">
        {NAVBAR_TOP_LINKS.map((item) => (
          <SidebarLink
            key={item.id}
            item={item}
            onClickLink={onClickLink}
            disabled={item?.disabled}
            isMobile={true}
          />
        ))}
        {/* Optional: Include Logout or Bottom links in mobile nav? 
            For now, user requested 'icon and name' in flex-col for mobile sidebar replacement.
            Common pattern is to put 'Profile' or 'More' for secondary links.
            I will include the logout button here as well for easy access if space permits, 
            or maybe just the top links + logout. 
            Let's stick to TOP_LINKS first as main nav.
        */}
      </div>
    </>
  );
};

export default DashboardSidebar;
