"use client";

// import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  //   const { accessToken } = useAuthContext();

  const accessToken = "";

  // useEffect(() => {
  //   if (!accessToken) router.push("/auth/sign-in");
  // }, [accessToken]);

  return <>{children}</>;
}
