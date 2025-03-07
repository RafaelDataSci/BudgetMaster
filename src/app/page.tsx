import { IncomeSection } from "@/components/ui/IncomeSection";
import { ExpenseSection } from "@/components/ui/ExpenseSection";
import { OverviewSection } from "@/components/ui/OverviewSection";
import { AnalysisSection } from "@/components/ui/AnalysisSection";
import { ExportSection } from "@/components/ui/ExportSection";

export default function Home() {
  // Placeholder data
  const totalIncome = 5000;
  const totalSpent = 3000;
  const netBalance = totalIncome - totalSpent;
  const suggestions = ["Consider reducing dining out expenses.", "Increase savings by 10%."];
  const unusualSpending = "High spending in entertainment detected!";
  const budgetScore = 75;

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-green-600">BudgetMaster</h1>
      <IncomeSection />
      <ExpenseSection />
      <OverviewSection totalIncome={totalIncome} totalSpent={totalSpent} netBalance={netBalance} />
      <AnalysisSection suggestions={suggestions} unusualSpending={unusualSpending} budgetScore={budgetScore} />
      <ExportSection />
    </main>
  );
}