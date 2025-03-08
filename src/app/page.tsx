"use client";

import { useEffect, useState } from 'react';
import { useBudget } from '@/app/context/BudgetContext';
import { IncomeSection } from '@/app/components/ui/IncomeSection';
import { ExpenseSection } from '@/app/components/ui/ExpenseSection';
import { FinancialOverview } from '@/app/components/ui/FinancialOverview';
import AnalysisSection from '@/app/components/ui/AnalysisSection';

export default function Home() {
  const { data } = useBudget();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [unusualSpending, setUnusualSpending] = useState<string>('');
  const [budgetScore, setBudgetScore] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const totalIncome = data.income.reduce((sum, inc) => sum + inc.monthlyIncome + inc.extraIncome, 0);
      const totalExpenses = data.expenses.reduce((sum, exp) => sum + exp.actualCost, 0);
      const entertainmentSpending = data.expenses
        .filter(exp => exp.category === "Entertainment")
        .reduce((sum, exp) => sum + exp.actualCost, 0);

      const newSuggestions = totalExpenses > totalIncome
        ? ["Reduce dining out expenses.", "Increase savings by 10%"]
        : ["Maintain current spending."];
      const newUnusualSpending = entertainmentSpending > 500
        ? "High entertainment spending detected!"
        : "No unusual spending.";
      const newBudgetScore = totalIncome > 0
        ? Math.round((totalIncome - totalExpenses) / totalIncome * 100)
        : 0;

      setSuggestions(newSuggestions);
      setUnusualSpending(newUnusualSpending);
      setBudgetScore(newBudgetScore);
    }
  }, [data]);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IncomeSection />
        <ExpenseSection />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialOverview />
        <AnalysisSection
          suggestions={suggestions}
          unusualSpending={unusualSpending}
          budgetScore={budgetScore}
        />
      </div>
    </div>
  );
}