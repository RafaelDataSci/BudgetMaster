"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export function IncomeSection() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [extraIncome, setExtraIncome] = useState("");

  const handleUpdate = () => {
    console.log("Updating income:", { monthlyIncome, extraIncome });
    setMonthlyIncome("");
    setExtraIncome("");
  };

  return (
    <Card className="card p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Income Management</h2>
      <Input
        placeholder="Monthly Income ($)"
        type="number"
        value={monthlyIncome}
        onChange={(e) => setMonthlyIncome(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Extra Income ($)"
        type="number"
        value={extraIncome}
        onChange={(e) => setExtraIncome(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleUpdate} className="green">
        Update Earnings
      </Button>
    </Card>
  );
}