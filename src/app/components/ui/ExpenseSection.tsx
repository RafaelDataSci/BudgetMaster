"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/ui/table";
import { Select, SelectItem } from "@/app/components/ui/select";
import { useBudget } from "@/app/context/BudgetContext";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface ExpenseSectionProps {
  expand?: boolean;
}

export function ExpenseSection({ expand = false }: ExpenseSectionProps) {
  const { data, setData } = useBudget();
  const [category, setCategory] = useState("");
  const [projectedCost, setProjectedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear().toString());
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
    console.log("Button clicked - addOrUpdateExpense called");
    console.log("Attempting to add/update expense:", { category, projectedCost, actualCost, month, year, notes });
    if (!category || !projectedCost || !actualCost) {
      console.log("Validation failed: Missing required fields");
      return;
    }

    const expense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      category,
      projectedCost: parseFloat(projectedCost),
      actualCost: parseFloat(actualCost),
      month,
      year,
      notes,
    };
    const updatedExpenses = editingExpense
      ? data.expenses.map((exp) => (exp.id === expense.id ? expense : exp))
      : [...data.expenses, expense];
    console.log("Updated expenses array:", updatedExpenses);

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "expenses", expenses: updatedExpenses }),
      });
      if (!response.ok) {
        throw new Error("Failed to save expense data");
      }
      const result = await response.json();
      console.log("API response:", result);
      setData({ ...data, expenses: updatedExpenses });
      resetForm();
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  const editExpense = (id: number) => {
    const expense = data.expenses.find((exp) => exp.id === id);
    if (expense) {
      setEditingExpense(expense);
      setCategory(expense.category);
      setProjectedCost(expense.projectedCost.toString());
      setActualCost(expense.actualCost.toString());
      setMonth(expense.month);
      setYear(expense.year);
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
    setYear(new Date().getFullYear().toString());
    setNotes("");
    setEditingExpense(null);
  };

  const getSortIcon = (field: keyof typeof data.expenses[0]) => {
    if (sortField !== field) return <FaSort className="ml-1" />;
    return sortDirection === "asc" ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  return (
    <Card className={`card ${expand ? "h-full" : ""}`}>
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
        <Button onClick={addOrUpdateExpense} className="bg-red-600 hover:bg-red-700 w-full">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </Button>
        {editingExpense && (
          <Button onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 w-full">
            Cancel
          </Button>
        )}
      </div>
      <Table className={`mt-4 w-full ${expand ? "h-[calc(100%-200px)]" : ""}`}>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead onClick={() => handleSort("category")}>
              Category {getSortIcon("category")}
            </TableHead>
            <TableHead onClick={() => handleSort("projectedCost")}>
              Projected {getSortIcon("projectedCost")}
            </TableHead>
            <TableHead onClick={() => handleSort("actualCost")}>
              Actual {getSortIcon("actualCost")}
            </TableHead>
            <TableHead onClick={() => handleSort("month")}>
              Month {getSortIcon("month")}
            </TableHead>
            <TableHead onClick={() => handleSort("year")}>
              Year {getSortIcon("year")}
            </TableHead>
            <TableHead onClick={() => handleSort("notes")}>
              Notes {getSortIcon("notes")}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedExpenses.map((expense, index) => (
            <TableRow key={expense.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
              <TableCell>{expense.category}</TableCell>
              <TableCell>${expense.projectedCost.toFixed(2)}</TableCell>
              <TableCell className={expense.actualCost > expense.projectedCost ? "text-red-600" : "text-td-blue"}>
                ${expense.actualCost.toFixed(2)}
              </TableCell>
              <TableCell>{expense.month}</TableCell>
              <TableCell>{expense.year}</TableCell>
              <TableCell>{expense.notes || ""}</TableCell>
              <TableCell>
                <Button onClick={() => editExpense(expense.id)} className="mr-2 bg-td-blue hover:bg-blue-700">
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