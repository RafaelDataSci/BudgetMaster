import { IncomeSection } from "@/app/components/ui/IncomeSection";
import { ExpenseSection } from "@/app/components/ui/ExpenseSection";
import { OverviewSection } from "@/app/components/ui/OverviewSection";
import { AnalysisSection } from "@/app/components/ui/AnalysisSection";
import { ExportSection } from "@/app/components/ui/ExportSection";
import { BudgetProvider } from "@/app/context/BudgetContext";

export default function Home() {
  const suggestions = ["Reduce dining out expenses.", "Increase savings by 10%."];
  const unusualSpending = "High entertainment spending detected!";
  const budgetScore = 75;

  return (
    <BudgetProvider>
      <main className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-td-green text-center">BudgetMaster</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeSection />
          <ExpenseSection />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <OverviewSection />
          <AnalysisSection suggestions={suggestions} unusualSpending={unusualSpending} budgetScore={budgetScore} />
        </div>
        <div className="mt-8 flex justify-center">
          <ExportSection />
        </div>
      </main>
    </BudgetProvider>
  );
}