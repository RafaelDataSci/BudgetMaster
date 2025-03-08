"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectItem } from "@/app/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
import { useBudget } from "@/app/context/BudgetContext";

// Dynamic import for BarChart to avoid SSR issues
const DynamicBarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), {
  ssr: false,
});

export function OverviewSection() {
  const { data } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [chartData, setChartData] = useState<{ name: string; value: number; fill: string }[]>([]);

  useEffect(() => {
    const expensesForMonthYear = data.expenses.filter(
      (exp) => exp.month === selectedMonth && exp.year === selectedYear
    );
    const incomeForMonthYear = data.income.find(
      (inc) => inc.month === selectedMonth && inc.year === selectedYear
    ) || { monthlyIncome: "0", extraIncome: "0", month: selectedMonth, year: selectedYear };

    const totalSpent = expensesForMonthYear.reduce((sum, exp) => sum + exp.actualCost, 0);
    const monthlyIncome = parseFloat(incomeForMonthYear.monthlyIncome.toString() || "0");
    const extraIncome = parseFloat(incomeForMonthYear.extraIncome.toString() || "0");
    const totalIncome = monthlyIncome + extraIncome;
    const netBalance = totalIncome - totalSpent;

    setChartData([
      { name: "Income", value: totalIncome, fill: "#00A650" },
      { name: "Spent", value: totalSpent, fill: "#FF3B30" },
      { name: "Net Balance", value: netBalance, fill: "#00ADEF" },
    ].filter((item) => item.value >= 0));
  }, [selectedMonth, selectedYear, data]);

  // Helper function to find a metric by name
  const getMetric = (name: string) => chartData.find((item) => item.name === name);

  // Get each metric safely
  const incomeMetric = getMetric("Income");
  const spentMetric = getMetric("Spent");
  const balanceMetric = getMetric("Net Balance");

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Financial Overview</h2>
      <div className="space-y-4">
        <Input
          placeholder="Year (e.g., 2024)"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full"
        />
        <Select value={selectedMonth} onValueChange={setSelectedMonth} className="w-full">
          {months.map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </Select>
        <DynamicBarChart width={400} height={200} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </DynamicBarChart>
        <Table className="mt-4 w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomeMetric && (
              <TableRow className="bg-gray-50">
                <TableCell>Income</TableCell>
                <TableCell>${incomeMetric.value.toFixed(2)}</TableCell>
              </TableRow>
            )}
            {spentMetric && (
              <TableRow className="bg-gray-100">
                <TableCell>Spent</TableCell>
                <TableCell>${spentMetric.value.toFixed(2)}</TableCell>
              </TableRow>
            )}
            {balanceMetric && (
              <TableRow className="bg-gray-50">
                <TableCell>Net Balance</TableCell>
                <TableCell className={balanceMetric.value >= 0 ? "text-green-600" : "text-red-600"}>
                  ${balanceMetric.value.toFixed(2)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}