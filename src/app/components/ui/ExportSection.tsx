"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";

export function ExportSection() {
  const handleExport = (type: string) => {
    console.log(`Exporting ${type} to CSV`);
  };

  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Data Export</h2>
      <div className="space-y-2">
        <Button onClick={() => handleExport("expenses")} className="w-full">
          Export Expenses to CSV
        </Button>
        <Button onClick={() => handleExport("income")} className="w-full">
          Export Income to CSV
        </Button>
      </div>
    </Card>
  );
}