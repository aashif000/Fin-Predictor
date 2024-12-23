import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ComposedChart, Bar } from "recharts";

interface ForecastData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  cumulativeSavings: number;
}

export function FinancialForecast() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [forecastMonths, setForecastMonths] = useState<number>(12);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const generateForecast = () => {
    const monthlySavings = monthlyIncome - monthlyExpenses;
    const data: ForecastData[] = [];
    let cumulativeSavings = 0;

    for (let i = 1; i <= forecastMonths; i++) {
      cumulativeSavings += monthlySavings;
      data.push({
        month: `Month ${i}`,
        income: monthlyIncome,
        expenses: monthlyExpenses,
        savings: monthlySavings,
        cumulativeSavings: cumulativeSavings
      });
    }

    setForecastData(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income</Label>
              <Input
                id="income"
                type="number"
                value={monthlyIncome || ""}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                placeholder="Enter monthly income"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expenses">Monthly Expenses</Label>
              <Input
                id="expenses"
                type="number"
                value={monthlyExpenses || ""}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                placeholder="Enter monthly expenses"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="months">Forecast Months</Label>
              <Input
                id="months"
                type="number"
                value={forecastMonths || ""}
                onChange={(e) => setForecastMonths(Number(e.target.value))}
                placeholder="Enter number of months"
              />
            </div>
          </div>

          <Button onClick={generateForecast}>Generate Forecast</Button>

          {forecastData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ComposedChart
                      width={500}
                      height={300}
                      data={forecastData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#8884d8" name="Income" />
                      <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                      <Line type="monotone" dataKey="savings" stroke="#ff7300" name="Monthly Savings" />
                    </ComposedChart>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cumulative Savings Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <AreaChart
                      width={500}
                      height={300}
                      data={forecastData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="cumulativeSavings" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Cumulative Savings"
                      />
                    </AreaChart>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}