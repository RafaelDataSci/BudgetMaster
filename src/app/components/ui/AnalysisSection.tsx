import React from 'react';

interface AnalysisSectionProps {
  suggestions: string[];
  unusualSpending: string;
  budgetScore: number;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({ suggestions, unusualSpending, budgetScore }) => {
  return (
    <div>
      <h2>Analysis Section</h2>
      <p>Budget Score: {budgetScore}</p>
      <p>Unusual Spending: {unusualSpending}</p>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};