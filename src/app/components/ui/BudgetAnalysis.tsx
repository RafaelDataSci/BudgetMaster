"use client";

import { useBudget } from "@/app/context/BudgetContext";
import { Card } from "@/app/components/ui/Card";

export function BudgetAnalysis() {
  const { data } = useBudget();
  const totalIncome = data.income.reduce((sum, inc) => sum + (inc.monthlyIncome || 0) + (inc.extraIncome || 0), 0);
  const totalSpent = data.expenses.reduce((sum, exp) => sum + exp.actualCost, 0);
  const highestSpending = data.expenses.length ? Math.max(...data.expenses.map(exp => exp.actualCost)) : 0;
  const suggestions = totalSpent > totalIncome ? ["Consider reducing expenses."] : ["You're within budget."];
  const budgetScore = totalSpent <= totalIncome ? 100 : Math.round((totalIncome / totalSpent) * 100);

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Budget Analysis</h2>
      <div className="space-y-4">
        <p>Highest Spending: ${highestSpending.toFixed(2)}</p>
        <p>Suggestions: {suggestions.join(", ")}</p>
        <p>Financial Health Score: {budgetScore}/100</p>
      </div>
    </Card>
  );
}