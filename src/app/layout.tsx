import type { Metadata } from "next";
import Initializers from "./initializers";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Initializers>{children}</Initializers>
      </body>
    </html>
  );
}
