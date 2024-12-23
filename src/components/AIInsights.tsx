import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Insight {
  title: string;
  description: string;
  score: number;
  category: string;
}

export function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);

  const generateInsights = () => {
    const newInsights = [
      {
        title: "Portfolio Diversification",
        description: "Consider diversifying your investments across different asset classes to reduce risk.",
        score: 85,
        category: "Risk Management"
      },
      {
        title: "Savings Potential",
        description: "Based on your income and expenses, you have potential to increase your investment allocation.",
        score: 92,
        category: "Savings"
      },
      {
        title: "Risk Assessment",
        description: "Your current portfolio shows a balanced risk profile. Consider adjusting based on your goals.",
        score: 78,
        category: "Risk Management"
      }
    ];
    
    setInsights(newInsights);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={generateInsights} className="mb-4">Generate Insights</Button>
        
        {insights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index} className="bg-accent/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{insight.description}</p>
                    <p className="text-sm text-muted-foreground">Category: {insight.category}</p>
                    <p className="text-sm text-muted-foreground">Confidence Score: {insight.score}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Insight Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <BarChart
                    width={400}
                    height={300}
                    data={insights}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#8884d8" name="Confidence Score" />
                  </BarChart>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}