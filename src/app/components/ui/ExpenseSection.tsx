"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
import { useBudget } from "@/app/context/BudgetContext";

export function ExpenseSection() {
  const { data, setData } = useBudget();
  const [category, setCategory] = useState("");
  const [projectedCost, setProjectedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [month, setMonth] = useState("January");
  const [notes, setNotes] = useState("");
  const [editingExpense, setEditingExpense] = useState<typeof data.expenses[0] | null>(null);
  const [sortField, setSortField] = useState<keyof typeof data.expenses[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const sortedExpenses = [...data.expenses].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField] ?? "";
    const bValue = b[sortField] ?? "";
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
    if (aString < bString) return sortDirection === "asc" ? -1 : 1;
    if (aString > bString) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof typeof data.expenses[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const addOrUpdateExpense = async () => {
    if (!category || !projectedCost || !actualCost) return;
    const expense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      category,
      projectedCost: parseFloat(projectedCost),
      actualCost: parseFloat(actualCost),
      month,
      notes,
    };
    const updatedExpenses = editingExpense
      ? data.expenses.map((exp) => (exp.id === expense.id ? expense : exp))
      : [...data.expenses, expense];
    setData({ ...data, expenses: updatedExpenses });
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "expenses", expenses: updatedExpenses }),
    });
    resetForm();
  };

  const editExpense = (id: number) => {
    const expense = data.expenses.find((exp) => exp.id === id);
    if (expense) {
      setEditingExpense(expense);
      setCategory(expense.category);
      setProjectedCost(expense.projectedCost.toString());
      setActualCost(expense.actualCost.toString());
      setMonth(expense.month);
      setNotes(expense.notes || "");
    }
  };

  const deleteExpense = async (id: number) => {
    const updatedExpenses = data.expenses.filter((exp) => exp.id !== id);
    setData({ ...data, expenses: updatedExpenses });
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "expenses", expenses: updatedExpenses }),
    });
  };

  const resetForm = () => {
    setCategory("");
    setProjectedCost("");
    setActualCost("");
    setMonth("January");
    setNotes("");
    setEditingExpense(null);
  };

  return (
    <Card className="card">
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
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full"
        />
        <Button onClick={addOrUpdateExpense} className="bg-red-600 hover:bg-red-700 w-full">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </Button>
        {editingExpense && (
          <Button onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 w-full">
            Cancel
          </Button>
        )}
      </div>
      <Table className="mt-4 border border-gray-300 rounded">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("category")}>Category</TableHead>
            <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("projectedCost")}>Projected</TableHead>
            <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("actualCost")}>Actual</TableHead>
            <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("month")}>Month</TableHead>
            <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("notes")}>Notes</TableHead>
            <TableHead className="p-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedExpenses.map((expense, index) => (
            <TableRow key={expense.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
              <TableCell className="p-2">{expense.category}</TableCell>
              <TableCell className="p-2">${expense.projectedCost.toFixed(2)}</TableCell>
              <TableCell className={`p-2 ${expense.actualCost > expense.projectedCost ? "text-red-600" : "text-blue-800"}`}>
                ${expense.actualCost.toFixed(2)}
              </TableCell>
              <TableCell className="p-2">{expense.month}</TableCell>
              <TableCell className="p-2">{expense.notes || ""}</TableCell>
              <TableCell className="p-2">
                <Button onClick={() => editExpense(expense.id)} className="mr-2 bg-blue-600 hover:bg-blue-700">
                  Edit
                </Button>
                <Button onClick={() => deleteExpense(expense.id)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}