import { Card } from "@/components/ui/Card";

interface OverviewSectionProps {
  totalIncome: number;
  totalSpent: number;
  netBalance: number;
}

export function OverviewSection({ totalIncome, totalSpent, netBalance }: OverviewSectionProps) {
  return (
    <Card className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Overview</h2>
      <div className="space-y-2">
        <p className="metric green">Total Income: ${totalIncome.toFixed(2)}</p>
        <p className="metric red">Total Spent: ${totalSpent.toFixed(2)}</p>
        <p className={`metric ${netBalance >= 0 ? "green" : "red"}`}>
          Net Balance: ${netBalance.toFixed(2)}
        </p>
      </div>
    </Card>
  );
}