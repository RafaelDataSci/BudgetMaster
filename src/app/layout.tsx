import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BudgetMaster",
  description: "A modern budgeting app inspired by Apple aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}