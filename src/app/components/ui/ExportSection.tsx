"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/button";
import { useBudget } from "@/app/context/BudgetContext";

export function ExportSection() {
  const { data } = useBudget();

  const exportToCSV = () => {
    const headers = ["Category,Projected Cost,Actual Cost,Month,Year,Notes"];
    const expenseRows = data.expenses.map((exp) =>
      `${exp.category},${exp.projectedCost},${exp.actualCost},${exp.month},${exp.year},${exp.notes || ""}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...expenseRows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "budget_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="card w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Export Data</h2>
      <Button onClick={exportToCSV} className="bg-td-blue hover:bg-blue-700 w-full">
        Export to CSV
      </Button>
    </Card>
  );
}