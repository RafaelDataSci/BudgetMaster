"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Select, SelectItem } from "@/app/components/ui/select";
import { useBudget } from "@/app/context/BudgetContext";

export function IncomeSection() {
  const { data, setData } = useBudget();
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [extraIncome, setExtraIncome] = useState("");
  const [error, setError] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleUpdate = async () => {
    console.log("Button clicked - handleUpdate called");
    console.log("Attempting to add income:", { month, year, monthlyIncome, extraIncome });
    if (!monthlyIncome && !extraIncome) {
      setError("Please enter at least Monthly Income or Extra Income.");
      return;
    }
    setError("");

    const newIncome = { month, year, monthlyIncome, extraIncome };
    const updatedIncome = [...data.income, newIncome];
    console.log("Updated income array:", updatedIncome);

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "income", income: updatedIncome }),
      });
      if (!response.ok) {
        throw new Error("Failed to save income data");
      }
      const result = await response.json();
      console.log("API response:", result);
      setData({ ...data, income: updatedIncome });
      resetForm();
    } catch (err) {
      console.error("Error saving income:", err);
      setError("Failed to save income. Check the console for details.");
    }
  };

  const resetForm = () => {
    setMonthlyIncome("");
    setExtraIncome("");
    setError("");
  };

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-td-green text-center">Income Management</h2>
      <div className="space-y-4">
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
          placeholder="Monthly Income ($)"
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="Extra Income ($)"
          type="number"
          value={extraIncome}
          onChange={(e) => setExtraIncome(e.target.value)}
          className="w-full"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button onClick={handleUpdate} className="bg-td-green hover:bg-green-700 w-full">
          Add Income
        </Button>
      </div>
    </Card>
  );
}