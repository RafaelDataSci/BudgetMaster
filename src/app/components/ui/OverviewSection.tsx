"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
import { useBudget } from "@/app/context/BudgetContext";

export function OverviewSection() {
  const { data } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const expensesForMonthYear = data.expenses.filter(
    (exp) => exp.month === selectedMonth && exp.year === selectedYear
  );
  const incomeForMonthYear = data.income.find(
    (inc) => inc.month === selectedMonth && inc.year === selectedYear
  );

  const totalSpent = expensesForMonthYear.reduce((sum, exp) => sum + exp.actualCost, 0);
  const monthlyIncome = parseFloat(incomeForMonthYear?.monthlyIncome || "0");
  const extraIncome = parseFloat(incomeForMonthYear?.extraIncome || "0");
  const totalIncome = monthlyIncome + extraIncome;
  const netBalance = totalIncome - totalSpent;

  const chartData = [
    { name: "Income", value: totalIncome, fill: "#00A650" },
    { name: "Spent", value: totalSpent, fill: "#FF3B30" },
    { name: "Net Balance", value: netBalance, fill: "#00ADEF" },
  ];

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
        <BarChart width={400} height={200} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
        <Table className="mt-4 w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-gray-50">
              <TableCell>Income</TableCell>
              <TableCell>${totalIncome.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableCell>Spent</TableCell>
              <TableCell>${totalSpent.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Net Balance</TableCell>
              <TableCell className={netBalance >= 0 ? "text-td-green" : "text-red-600"}>
                ${netBalance.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}