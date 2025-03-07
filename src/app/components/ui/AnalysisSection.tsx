"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "@/app/components/ui/Card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/Table";
import { useBudget } from "@/app/context/BudgetContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FE5", "#FF6666"];

export function AnalysisSection({ suggestions, unusualSpending, budgetScore }: { suggestions: string[]; unusualSpending: string; budgetScore: number }) {
  const { data } = useBudget();
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);

  const categoryTotals = data.expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.actualCost;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  const highestCategory = pieData.reduce((prev, current) => (prev.value > current.value ? prev : current), { name: "", value: 0 });

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Budget Analysis</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          cx={200}
          cy={150}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <Table className="mt-4 border border-gray-300 rounded">
        <TableBody>
          <TableRow className="bg-gray-50">
            <TableCell className="p-2 font-medium">Highest Spending</TableCell>
            <TableCell className="p-2">{highestCategory.name} (${highestCategory.value.toFixed(2)})</TableCell>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableCell className="p-2 font-medium">Suggestions</TableCell>
            <TableCell className="p-2">
              {suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className={`text-blue-600 hover:underline cursor-pointer transition-colors ${hoveredSuggestion === i ? "text-blue-800" : ""}`}
                  onMouseEnter={() => setHoveredSuggestion(i)}
                  onMouseLeave={() => setHoveredSuggestion(null)}
                  onClick={() => alert(`Suggestion: ${suggestion}`)}
                >
                  • {suggestion}
                </div>
              ))}
            </TableCell>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="p-2 font-medium">Unusual Spending</TableCell>
            <TableCell className="p-2 text-red-600">⚠️ {unusualSpending}</TableCell>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableCell className="p-2 font-medium">Financial Health Score</TableCell>
            <TableCell className="p-2">{budgetScore}/100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}