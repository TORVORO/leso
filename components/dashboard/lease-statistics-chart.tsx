"use client";

import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const data = [
  { month: 'Jan', lease_expense: 22000, right_of_use_assets: 1250000 },
  { month: 'Feb', lease_expense: 22500, right_of_use_assets: 1235000 },
  { month: 'Mar', lease_expense: 23000, right_of_use_assets: 1225000 },
  { month: 'Apr', lease_expense: 28000, right_of_use_assets: 1320000 },
  { month: 'May', lease_expense: 28500, right_of_use_assets: 1310000 },
  { month: 'Jun', lease_expense: 28500, right_of_use_assets: 1300000 },
  { month: 'Jul', lease_expense: 28000, right_of_use_assets: 1290000 },
  { month: 'Aug', lease_expense: 27500, right_of_use_assets: 1280000 },
  { month: 'Sep', lease_expense: 27000, right_of_use_assets: 1270000 },
  { month: 'Oct', lease_expense: 27000, right_of_use_assets: 1260000 },
  { month: 'Nov', lease_expense: 28000, right_of_use_assets: 1250000 },
  { month: 'Dec', lease_expense: 28500, right_of_use_assets: 1240000 },
];

type TimeRange = '1m' | '3m' | '6m' | '1y' | 'all';

export function LeaseStatisticsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1y');

  // Filter data based on time range
  const filteredData = (() => {
    switch (timeRange) {
      case '1m':
        return data.slice(-1);
      case '3m':
        return data.slice(-3);
      case '6m':
        return data.slice(-6);
      case '1y':
      case 'all':
      default:
        return data;
    }
  })();

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
      <div className="flex items-center justify-end space-x-1">
        <RangeButton value="1m" current={timeRange} onChange={setTimeRange}>1M</RangeButton>
        <RangeButton value="3m" current={timeRange} onChange={setTimeRange}>3M</RangeButton>
        <RangeButton value="6m" current={timeRange} onChange={setTimeRange}>6M</RangeButton>
        <RangeButton value="1y" current={timeRange} onChange={setTimeRange}>1Y</RangeButton>
        <RangeButton value="all" current={timeRange} onChange={setTimeRange}>All</RangeButton>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ strokeWidth: 0 }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              tickFormatter={formatYAxisTick}
              tickLine={false}
              axisLine={{ strokeWidth: 0 }}
              width={60}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickFormatter={formatYAxisTick}
              tickLine={false}
              axisLine={{ strokeWidth: 0 }}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="lease_expense"
              name="Lease Expense"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorExpense)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="right_of_use_assets"
              name="Right-of-Use Assets"
              stroke="hsl(var(--chart-2))"
              fillOpacity={1}
              fill="url(#colorAssets)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface RangeButtonProps {
  value: TimeRange;
  current: TimeRange;
  onChange: (value: TimeRange) => void;
  children: React.ReactNode;
}

function RangeButton({ value, current, onChange, children }: RangeButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("h-7 w-10 text-xs", {
        "bg-primary text-primary-foreground": value === current,
      })}
      onClick={() => onChange(value)}
    >
      {children}
    </Button>
  );
}