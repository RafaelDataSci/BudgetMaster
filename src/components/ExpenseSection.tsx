"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export function ExpenseSection() {
  const [expenses, setExpenses] = useState([]);
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
    <Card className="card p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Expense Tracking</h2>
      <div className="space-y-4 mb-6">
        <Input
          placeholder="Category (e.g., Rent)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          placeholder="Projected Cost ($)"
          type="number"
          value={projectedCost}
          onChange={(e) => setProjectedCost(e.target.value)}
        />
        <Input
          placeholder="Actual Cost ($)"
          type="number"
          value={actualCost}
          onChange={(e) => setActualCost(e.target.value)}
        />
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger>
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addExpense} className="red">Add Expense</Button>
      </div>
      <Table className="table">
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Projected</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Month</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.category}</TableCell>
              <TableCell>${expense.projectedCost.toFixed(2)}</TableCell>
              <TableCell>${expense.actualCost.toFixed(2)}</TableCell>
              <TableCell>{expense.month}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}