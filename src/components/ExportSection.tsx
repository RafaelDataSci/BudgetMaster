import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export function ExportSection() {
  return (
    <Card className="card p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Data Export</h2>
      <div className="space-y-2">
        <Button>Export Expenses to CSV</Button>
        <Button>Export Income to CSV</Button>
      </div>
    </Card>
  );
}