import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Initializers from "./initializers";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jost",
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
    <html lang="en" className={`${jost.variable}`} suppressHydrationWarning>
      <body className={jost.className}>
        <Initializers>{children}</Initializers>
      </body>
    </html>
  );
}
