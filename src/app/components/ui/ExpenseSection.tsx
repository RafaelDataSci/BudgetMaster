"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

interface ExpenseSectionProps {
  initialExpenses?: { id: number; category: string; projectedCost: number; actualCost: number; month: string }[];
}

export function ExpenseSection({ initialExpenses = [] }: ExpenseSectionProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [category, setCategory] = useState("");
  const [projectedCost, setProjectedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [month, setMonth] = useState("January");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const addExpense = () => {
    if (!category || !projectedCost || !actualCost) return;
    const newExpense = {
      id: Date.now(),
      category,
      projectedCost: parseFloat(projectedCost),
      actualCost: parseFloat(actualCost),
      month,
    };
    setExpenses([...expenses, newExpense]);
    setCategory("");
    setProjectedCost("");
    setActualCost("");
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Expense Tracking</h2>
      <div className="space-y-4 mb-6">
        <Input
          placeholder="Category (e.g., Rent)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <Input
          placeholder="Projected Cost ($)"
          type="number"
          value={projectedCost}
          onChange={(e) => setProjectedCost(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <Input
          placeholder="Actual Cost ($)"
          type="number"
          value={actualCost}
          onChange={(e) => setActualCost(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={addExpense}
          className="bg-red-600 hover:bg-red-700 text-white w-full rounded-md py-2"
        >
          Add Expense
        </Button>
      </div>
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-100 text-gray-600 p-2">Category</TableHead>
            <TableHead className="bg-gray-100 text-gray-600 p-2">Projected</TableHead>
            <TableHead className="bg-gray-100 text-gray-600 p-2">Actual</TableHead>
            <TableHead className="bg-gray-100 text-gray-600 p-2">Month</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} className="hover:bg-gray-50">
              <TableCell className="p-2">{expense.category}</TableCell>
              <TableCell className="p-2">${expense.projectedCost.toFixed(2)}</TableCell>
              <TableCell className="p-2">${expense.actualCost.toFixed(2)}</TableCell>
              <TableCell className="p-2">{expense.month}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}