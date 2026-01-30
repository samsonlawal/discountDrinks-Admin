import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Initializers from "./initializers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Discount Drinks | Admin",
  description: "Discount Drinks Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <Initializers>{children}</Initializers>
      </body>
    </html>
  );
}
