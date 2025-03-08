"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BudgetData {
  income: { month: string; year: string; monthlyIncome: number; extraIncome: number }[];
  expenses: { id: number; category: string; projectedCost: number; actualCost: number; month: string; year: string; notes?: string }[];
}

interface BudgetContextType {
  data: BudgetData;
  setData: (data: BudgetData) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BudgetData>({ income: [], expenses: [] });
  return (
    <BudgetContext.Provider value={{ data, setData }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}