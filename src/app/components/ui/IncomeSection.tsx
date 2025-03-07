"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useBudget } from "@/app/context/BudgetContext";

export function IncomeSection() {
  const { data, setData } = useBudget();
  const [monthlyIncome, setMonthlyIncome] = useState(data.income.monthlyIncome);
  const [extraIncome, setExtraIncome] = useState(data.income.extraIncome);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (extraIncome && !monthlyIncome) {
      setError("Please enter Monthly Income before adding Extra Income.");
      return;
    }
    setError("");
    const updatedIncome = { monthlyIncome, extraIncome };
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "income", income: updatedIncome }),
    });
    setData({ ...data, income: updatedIncome });
  };

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Income Management</h2>
      <div className="space-y-4">
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
        <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 w-full">
          Update Earnings
        </Button>
      </div>
    </Card>
  );
}