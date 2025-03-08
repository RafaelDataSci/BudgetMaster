export function getSuggestions(expenses: any[], totalIncome: number, totalSpent: number) {
  const suggestions = [];
  if (totalSpent > totalIncome) {
    suggestions.push("Consider reducing discretionary spending to avoid overspending.");
  }
  const diningExpenses = expenses.filter((exp: { category: string; }) => exp.category === "Dining");
  if (diningExpenses.length > 0) {
    const totalDining = diningExpenses.reduce((sum: any, exp: { actualCost: any; }) => sum + exp.actualCost, 0);
    if (totalDining > 0.2 * totalIncome) {
      suggestions.push("Reduce dining out expenses to save more.");
    }
  }
  if (totalIncome - totalSpent > 0) {
    suggestions.push("Consider increasing your savings by 10%.");
  }
  return suggestions;
}

export function calculateHealthScore(totalIncome: number, totalSpent: number): number {
  if (totalIncome === 0) return 0;
  const savingsRate = (totalIncome - totalSpent) / totalIncome;
  let score = 50; // Base score
  if (savingsRate > 0.2) score += 30;
  else if (savingsRate > 0.1) score += 20;
  else if (savingsRate > 0) score += 10;
  if (totalSpent < totalIncome) score += 20;
  return Math.min(score, 100);
}