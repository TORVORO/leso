"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Sample data for charts
const monthlyExpenseData = [
  { month: 'Jan', expense: 120000, assets: 4500000 },
  { month: 'Feb', expense: 125000, assets: 4470000 },
  { month: 'Mar', expense: 147000, assets: 4440000 },
  { month: 'Apr', expense: 147000, assets: 4410000 },
  { month: 'May', expense: 150000, assets: 4380000 },
  { month: 'Jun', expense: 153000, assets: 4350000 },
  { month: 'Jul', expense: 158000, assets: 4320000 },
  { month: 'Aug', expense: 158000, assets: 4290000 },
  { month: 'Sep', expense: 162000, assets: 4260000 },
  { month: 'Oct', expense: 162000, assets: 4230000 },
  { month: 'Nov', expense: 165000, assets: 4200000 },
  { month: 'Dec', expense: 168000, assets: 4170000 },
];

const leaseTypeData = [
  { name: 'Office Space', value: 42 },
  { name: 'Retail', value: 28 },
  { name: 'Warehouse', value: 15 },
  { name: 'Equipment', value: 10 },
  { name: 'Vehicles', value: 5 },
];

const expiryData = [
  { year: '2024', count: 5 },
  { year: '2025', count: 12 },
  { year: '2026', count: 8 },
  { year: '2027', count: 4 },
  { year: '2028', count: 10 },
  { year: '2029+', count: 3 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function StatisticsCharts() {
  const [activeTab, setActiveTab] = useState('expenses');
  
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="expenses">Expense Trend</TabsTrigger>
          <TabsTrigger value="types">Lease Types</TabsTrigger>
          <TabsTrigger value="expiry">Expiry Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses" className="p-2">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyExpenseData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis 
                  yAxisId="left" 
                  tickFormatter={formatYAxisTick}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ strokeWidth: 0 }}
                  width={65}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tickFormatter={formatYAxisTick}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ strokeWidth: 0 }}
                  width={65}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="expense" 
                  name="Monthly Expense" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="assets" 
                  name="Right-of-Use Assets" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="types" className="p-2">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaseTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={140}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {leaseTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} leases`, null]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="expiry" className="p-2">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={expiryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="year" />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ strokeWidth: 0 }}
                />
                <Tooltip
                  formatter={(value) => [`${value} leases expiring`, null]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Leases Expiring" 
                  fill="hsl(var(--chart-3))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}