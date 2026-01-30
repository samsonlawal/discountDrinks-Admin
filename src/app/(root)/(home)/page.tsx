"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Spinner from "@/components/molecules/Spinner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/admin");
    }, 1400);
  }, []);

  return (
    <>
      <div className="h-screen bg-[#151357] w-full flex items-center justify-center flex-col">
        <img
          src="/icons/logo-white.svg"
          className="w-[80px] mb-[20px] object-contain"
          alt="logo"
        />

        <Spinner className="text-white" />
      </div>
    </>
  );
}
