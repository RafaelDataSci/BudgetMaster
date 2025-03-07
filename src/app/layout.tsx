import { BudgetProvider } from "@/app/context/BudgetContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BudgetMaster",
  description: "A modern budgeting app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BudgetProvider>{children}</BudgetProvider>
      </body>
    </html>
  );
}