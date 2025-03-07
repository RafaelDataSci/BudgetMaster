"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card } from "@/app/components/ui/Card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/Select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/Table";
import { useBudget } from "@/app/context/BudgetContext";

export function OverviewSection() {
  const { data } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const expensesForMonth = data.expenses.filter((exp) => exp.month === selectedMonth);
  const totalSpent = expensesForMonth.reduce((sum, exp) => sum + exp.actualCost, 0);
  const monthlyIncome = parseFloat(data.income.monthlyIncome || "0");
  const extraIncome = parseFloat(data.income.extraIncome || "0");
  const totalIncome = monthlyIncome + extraIncome;
  const netBalance = totalIncome - totalSpent;

  const chartData = [
    { name: "Income", value: totalIncome, fill: "#34C759" },
    { name: "Spent", value: totalSpent, fill: "#FF3B30" },
    { name: "Net Balance", value: netBalance, fill: "#007AFF" },
  ];

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Financial Overview</h2>
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-full mb-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
      <Table className="mt-4 border border-gray-300 rounded">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-2">Metric</TableHead>
            <TableHead className="p-2">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-gray-50">
            <TableCell className="p-2">Income</TableCell>
            <TableCell className="p-2">${totalIncome.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableCell className="p-2">Spent</TableCell>
            <TableCell className="p-2">${totalSpent.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="bg-gray-50">
            <TableCell className="p-2">Net Balance</TableCell>
            <TableCell className={`p-2 ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netBalance.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}