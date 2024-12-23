import { InvestmentPortfolio } from "@/components/InvestmentPortfolio";
import { FinancialForecast } from "@/components/FinancialForecast";
import { AIInsights } from "@/components/AIInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">FinPredictor</h1>
          <p className="text-muted-foreground">Advanced Investment & Financial Forecasting Platform</p>
        </div>
        
        <InvestmentPortfolio />
        <FinancialForecast />
        <AIInsights />
      </div>
    </div>
  );
};

export default Index;