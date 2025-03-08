"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
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

  const handleAddIncome = () => {
    const monthly = parseFloat(monthlyIncome) || 0;
    const extra = parseFloat(extraIncome) || 0;
    if (monthly === 0 && extra === 0) {
      setError("Please enter at least one income value.");
      return;
    }
    const newIncome = { month, year, monthlyIncome: monthly, extraIncome: extra };
    setData({ ...data, income: [...data.income, newIncome] });
    setMonthlyIncome("");
    setExtraIncome("");
    setError("");
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Income Management</h2>
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
        <button
          onClick={handleAddIncome}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Income
        </button>
      </div>
    </Card>
  );
}