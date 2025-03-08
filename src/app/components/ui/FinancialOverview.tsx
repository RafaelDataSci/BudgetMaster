"use client";

import { useBudget } from "@/app/context/BudgetContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card } from "@/app/components/ui/Card";

export function FinancialOverview() {
  const { data } = useBudget();
  const chartData = [
    {
      name: "Income",
      value: data.income.reduce((sum, inc) => sum + (inc.monthlyIncome || 0) + (inc.extraIncome || 0), 0),
    },
    { name: "Spent", value: data.expenses.reduce((sum, exp) => sum + exp.actualCost, 0) },
    {
      name: "Net Balance",
      value:
        data.income.reduce((sum, inc) => sum + (inc.monthlyIncome || 0) + (inc.extraIncome || 0), 0) -
        data.expenses.reduce((sum, exp) => sum + exp.actualCost, 0),
    },
  ];

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Financial Overview</h2>
      <BarChart width={400} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </Card>
  );
}