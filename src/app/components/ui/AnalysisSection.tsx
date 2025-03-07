"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
import { useBudget } from "@/app/context/BudgetContext";

const COLORS = ["#00ADEF", "#00A650", "#FFBB28", "#FF8042", "#A28FE5", "#FF6666"];

export function AnalysisSection({ suggestions, unusualSpending, budgetScore }: { suggestions: string[]; unusualSpending: string; budgetScore: number }) {
  const { data } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const expensesForMonthYear = data.expenses.filter(
    (exp) => exp.month === selectedMonth && exp.year === selectedYear
  );

  const categoryTotals = expensesForMonthYear.reduce((acc, exp) => {
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
      <div className="space-y-4">
        <Input
          placeholder="Year (e.g., 2024)"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full"
        />
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Table className="mt-4 w-full">
          <TableBody>
            <TableRow className="bg-gray-50">
              <TableCell className="font-medium">Highest Spending</TableCell>
              <TableCell>{highestCategory.name} (${highestCategory.value.toFixed(2)})</TableCell>
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableCell className="font-medium">Suggestions</TableCell>
              <TableCell>
                {suggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    className={`text-td-blue hover:underline cursor-pointer transition-colors ${hoveredSuggestion === i ? "text-blue-800" : ""}`}
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
              <TableCell className="font-medium">Unusual Spending</TableCell>
              <TableCell className="text-red-600">⚠️ {unusualSpending}</TableCell>
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableCell className="font-medium">Financial Health Score</TableCell>
              <TableCell>{budgetScore}/100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}