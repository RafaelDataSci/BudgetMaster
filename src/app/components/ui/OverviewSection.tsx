import { Card } from "@/components/ui/Card";

interface OverviewSectionProps {
  totalIncome: number;
  totalSpent: number;
  netBalance: number;
}

export function OverviewSection({ totalIncome, totalSpent, netBalance }: OverviewSectionProps) {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Overview</h2>
      <div className="space-y-2">
        <p className="text-xl font-medium text-green-600">Total Income: ${totalIncome.toFixed(2)}</p>
        <p className="text-xl font-medium text-red-600">Total Spent: ${totalSpent.toFixed(2)}</p>
        <p className={`text-xl font-medium ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
          Net Balance: ${netBalance.toFixed(2)}
        </p>
      </div>
    </Card>
  );
}