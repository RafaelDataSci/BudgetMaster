import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ExportSection() {
  const handleExport = (type: string) => {
    console.log(`Exporting ${type} to CSV`);
    // Placeholder for CSV export logic
  };

  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Data Export</h2>
      <div className="space-y-2">
        <Button onClick={() => handleExport("expenses")} className="bg-blue-600 hover:bg-blue-700 w-full">
          Export Expenses to CSV
        </Button>
        <Button onClick={() => handleExport("income")} className="bg-blue-600 hover:bg-blue-700 w-full">
          Export Income to CSV
        </Button>
      </div>
    </Card>
  );
}