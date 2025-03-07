import { Card } from "~/components/ui/card";

export function AnalysisSection({ suggestions, unusualSpending, budgetScore }) {
  return (
    <Card className="card p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Budget Analysis</h2>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <p key={index} className="text-blue-600">• {suggestion}</p>
        ))}
        {unusualSpending && <p className="text-red-600">⚠️ {unusualSpending}</p>}
        <p className="text-lg font-medium">Financial Health Score: {budgetScore}/100</p>
      </div>
    </Card>
  );
}