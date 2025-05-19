"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function LeasesSummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Real Estate</span>
              <span>24 (57%)</span>
            </div>
            <Progress value={57} className="h-1" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expense</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$28,459</div>
          <div className="flex items-center text-xs text-emerald-500 mt-1">
            <span>↓ 3.2% from last month</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex flex-col justify-between rounded-lg bg-muted px-2 py-1">
              <span className="text-[10px] text-muted-foreground">ASC 842</span>
              <span className="text-xs font-medium">$22,104</span>
            </div>
            <div className="flex flex-col justify-between rounded-lg bg-muted px-2 py-1">
              <span className="text-[10px] text-muted-foreground">IFRS 16</span>
              <span className="text-xs font-medium">$23,547</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground mt-1">Within next 90 days</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span>Office Space (NY)</span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-[10px]">
                14 days
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Warehouse (TX)</span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-[10px]">
                37 days
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground mt-1">Issues requiring attention</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-red-500">Missing Documentation</span>
              <span>2</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-amber-500">Renewal Decision Needed</span>
              <span>1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}