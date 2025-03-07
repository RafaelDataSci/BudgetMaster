"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Expense {
  id: number;
  category: string;
  projectedCost: number;
  actualCost: number;
  month: string;
  year: string;
  notes?: string;
}

interface Income {
  monthlyIncome: string;
  extraIncome: string;
  month: string;
  year: string;
}

interface BudgetData {
  expenses: Expense[];
  income: Income[];
}

interface BudgetContextType {
  data: BudgetData;
  setData: (data: BudgetData) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BudgetData>({
    expenses: [],
    income: [],
  });

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