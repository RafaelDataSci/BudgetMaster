"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface Expense {
  id: number;
  category: string;
  projectedCost: number;
  actualCost: number;
  month: string;
  notes?: string;
}

interface BudgetData {
  expenses: Expense[];
  income: { monthlyIncome: string; extraIncome: string };
}

interface BudgetContextType {
  data: BudgetData;
  setData: (data: BudgetData) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BudgetData>({
    expenses: [],
    income: { monthlyIncome: "0", extraIncome: "0" },
  });

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <BudgetContext.Provider value={{ data, setData }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}