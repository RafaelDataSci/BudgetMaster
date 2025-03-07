import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

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
    // Placeholder for API call
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
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
      <Button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 w-full">
        Update Earnings
      </Button>
    </Card>
  );
}