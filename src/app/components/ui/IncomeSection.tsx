"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IncomeSectionProps {
  initialMonthlyIncome?: string;
  initialExtraIncome?: string;
}

export function IncomeSection({ initialMonthlyIncome = "", initialExtraIncome = "" }: IncomeSectionProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(initialMonthlyIncome);
  const [extraIncome, setExtraIncome] = useState(initialExtraIncome);

  const handleUpdate = () => {
    console.log("Updating income:", { monthlyIncome, extraIncome });
    setMonthlyIncome("");
    setExtraIncome("");
  };

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Income Management</h2>
      <Input
        placeholder="Monthly Income ($)"
        type="number"
        value={monthlyIncome}
        onChange={(e) => setMonthlyIncome(e.target.value)}
        className="mb-4 w-full"
      />
      <Input
        placeholder="Extra Income ($)"
        type="number"
        value={extraIncome}
        onChange={(e) => setExtraIncome(e.target.value)}
        className="mb-4 w-full"
      />
      <Button onClick={handleUpdate} className="green w-full">
        Update Earnings
      </Button>
    </Card>
  );
}