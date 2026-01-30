"use client";
import React, { ReactNode } from "react";
// import NextTopLoader from "nextjs-toploader";
// import { Toaster } from "@/components/ui/sonner";
// import { AuthContextWrapper } from "@/context/AuthContext";

function Initializers({ children }: { children: ReactNode }) {
  return (
    // <AuthContextWrapper>
    //   <NextTopLoader color="#151357" height={5} />
    <div>{children}</div>
    //   <Toaster richColors />
    // </AuthContextWrapper>
  );
}

export default Initializers;
