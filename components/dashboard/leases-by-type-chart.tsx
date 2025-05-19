"use client";

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data
const data = [
  { name: 'Office', value: 42, percentage: '42%' },
  { name: 'Retail', value: 28, percentage: '28%' },
  { name: 'Warehouse', value: 15, percentage: '15%' },
  { name: 'Equipment', value: 10, percentage: '10%' },
  { name: 'Vehicles', value: 5, percentage: '5%' },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

type ChartView = 'count' | 'value';

export function LeasesByTypeChart() {
  const [view, setView] = useState<ChartView>('count');

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={view} onValueChange={(v) => setView(v as ChartView)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="View by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="count">Count</SelectItem>
            <SelectItem value="value">Lease Value</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ name, percentage }) => `${name}: ${percentage}`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [view === 'count' ? `${value} leases` : `$${(value * 10000).toLocaleString()}`, null]}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              formatter={(value) => <span className="text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}