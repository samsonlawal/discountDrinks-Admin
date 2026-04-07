"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/api/auth";
import { LogOut, LayoutDashboard, CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DashboardTopbar({ leftTitle }: { leftTitle?: string }) {
  const { onLogout } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push("/auth/sign-in");
  };

  return (
    <div
      className={`py-4 px-6 font-medium fixed h-[60px] w-full md:w-[calc(100%-240px)] shrink-0 border-b-[#E9EDF5] bg-white border-b-[1px] flex items-center justify-between`}
    >
      <div className="flex gap-4 items-center">
        <h3 className="text-[#111111] text-2xl leading-[26px]">{leftTitle}</h3>
      </div>

      <div className="flex gap-4 items-center">
        {/* Dashboard icon that only appears on mobile */}
        <Link 
          href="/dashboard" 
          className="md:hidden flex items-center justify-center w-fit h-9 rounded-md border border-gray-100 bg-white hover:bg-gray-50 transition-colors gap-2 px-2"
        >
          <LayoutDashboard className="w-4 h-4 text-gray-700" /> 
          <p className="text-gray-700 text-sm">Dashboard</p>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-100 bg-white hover:bg-gray-50 transition-colors  outline-none cursor-pointer">
              <CircleUser className="w-5 h-5 text-gray-700" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white z-50">
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="cursor-pointer text-red-600 focus:text-red-500 focus:bg-red-50"
            >
              <LogOut className="mr-2 w-4 h-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DashboardTopbar;
