import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

interface Investment {
  type: string;
  name: string;
  amount: number;
  returns: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function InvestmentPortfolio() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [newInvestment, setNewInvestment] = useState<Investment>({
    type: "",
    name: "",
    amount: 0,
    returns: 0,
  });

  const handleAddInvestment = () => {
    if (newInvestment.type && newInvestment.name && newInvestment.amount > 0) {
      setInvestments([...investments, newInvestment]);
      setNewInvestment({ type: "", name: "", amount: 0, returns: 0 });
    }
  };

  const totalPortfolio = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const averageReturns = investments.length > 0
    ? investments.reduce((sum, inv) => sum + inv.returns, 0) / investments.length
    : 0;

  // Calculate data for pie chart
  const pieData = investments.reduce((acc: any[], inv) => {
    const existingType = acc.find(item => item.type === inv.type);
    if (existingType) {
      existingType.value += inv.amount;
    } else {
      acc.push({ type: inv.type, value: inv.amount });
    }
    return acc;
  }, []);

  // Calculate historical performance data (simulated based on returns)
  const performanceData = investments.map(inv => ({
    name: inv.name,
    currentValue: inv.amount,
    projectedValue: inv.amount * (1 + inv.returns / 100),
    returns: inv.returns
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Investment Type</Label>
                  <Select
                    value={newInvestment.type}
                    onValueChange={(value) => setNewInvestment({ ...newInvestment, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="bonds">Bonds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Investment Name</Label>
                  <Input
                    id="name"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                    placeholder="Enter investment name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newInvestment.amount || ""}
                    onChange={(e) => setNewInvestment({ ...newInvestment, amount: Number(e.target.value) })}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returns">Expected Returns (%)</Label>
                  <Input
                    id="returns"
                    type="number"
                    value={newInvestment.returns || ""}
                    onChange={(e) => setNewInvestment({ ...newInvestment, returns: Number(e.target.value) })}
                    placeholder="Enter expected returns"
                  />
                </div>
              </div>

              <Button onClick={handleAddInvestment}>Add Investment</Button>
            </div>

            {investments.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">Total Portfolio Value: ${totalPortfolio.toFixed(2)}</p>
                    <p className="text-md">Average Expected Returns: {averageReturns.toFixed(2)}%</p>
                    
                    <div className="h-[300px] w-full mt-4">
                      <PieChart width={400} height={300}>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, value }) => `${type} (${((value/totalPortfolio)*100).toFixed(1)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <BarChart
                        width={400}
                        height={300}
                        data={performanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="currentValue" fill="#8884d8" name="Current Value" />
                        <Bar dataKey="projectedValue" fill="#82ca9d" name="Projected Value" />
                      </BarChart>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}