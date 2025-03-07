"use client";

import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/button";
import { useBudget } from "@/app/context/BudgetContext";

export function ExportSection() {
  const { data } = useBudget();

  const handleExport = async (type: string) => {
    const records = type === "expenses" ? data.expenses : [data.income];
    const headers =
      type === "expenses"
        ? [
            { id: "id", title: "ID" },
            { id: "category", title: "Category" },
            { id: "projectedCost", title: "Projected Cost" },
            { id: "actualCost", title: "Actual Cost" },
            { id: "month", title: "Month" },
            { id: "notes", title: "Notes" },
          ]
        : [
            { id: "monthlyIncome", title: "Monthly Income" },
            { id: "extraIncome", title: "Extra Income" },
          ];

    const csvRows = [];
    csvRows.push(headers.map((header) => header.title).join(","));

    if (type === "expenses") {
      records.forEach((record: any) => {
        const values = [
          record.id,
          record.category,
          record.projectedCost,
          record.actualCost,
          record.month,
          record.notes || "",
        ];
        csvRows.push(values.join(","));
      });
    } else {
      const record = records[0];
      csvRows.push([record.monthlyIncome, record.extraIncome].join(","));
    }

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="card p-4">
      <h2 className="text-xl font-bold mb-2 text-gray-800 text-center">Data Export</h2>
      <div className="flex space-x-2">
        <Button
          onClick={() => handleExport("expenses")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded-md transition-colors"
        >
          Export Expenses
        </Button>
        <Button
          onClick={() => handleExport("income")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded-md transition-colors"
        >
          Export Income
        </Button>
      </div>
    </Card>
  );
}