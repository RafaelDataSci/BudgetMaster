"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectItem } from "@/app/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
import { useBudget } from "@/app/context/BudgetContext";

export function ExpenseSection() {
  const { data, setData } = useBudget();
  const [category, setCategory] = useState("");
  const [projectedCost, setProjectedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [notes, setNotes] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleAddExpense = () => {
    if (!category || !projectedCost || !actualCost) {
      alert("Please fill in all required fields.");
      return;
    }
    const newExpense = {
      id: Date.now(),
      category,
      projectedCost: parseFloat(projectedCost),
      actualCost: parseFloat(actualCost),
      month,
      year,
      notes,
    };
    setData({ ...data, expenses: [...data.expenses, newExpense] });
    setCategory("");
    setProjectedCost("");
    setActualCost("");
    setNotes("");
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">Expense Tracking</h2>
      <div className="space-y-4">
        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="Projected Cost ($)"
          type="number"
          value={projectedCost}
          onChange={(e) => setProjectedCost(e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="Actual Cost ($)"
          type="number"
          value={actualCost}
          onChange={(e) => setActualCost(e.target.value)}
          className="w-full"
        />
        <Select value={month} onValueChange={setMonth} className="w-full">
          {months.map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </Select>
        <Input
          placeholder="Year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full"
        />
        <button
          onClick={handleAddExpense}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Expense
        </button>
      </div>
      <Table className="mt-4 w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Category</TableHead>
            <TableHead>Projected</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.category}</TableCell>
              <TableCell>${expense.projectedCost.toFixed(2)}</TableCell>
              <TableCell>${expense.actualCost.toFixed(2)}</TableCell>
              <TableCell>{expense.month}</TableCell>
              <TableCell>{expense.year}</TableCell>
              <TableCell>{expense.notes || ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}