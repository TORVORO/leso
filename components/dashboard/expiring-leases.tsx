"use client";

import { AlertTriangle, CheckCircle2, Building2, File } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const expiringLeases = [
  {
    id: 'LS-2022-007',
    name: 'Manhattan Office (Floor 8)',
    type: 'Office Space',
    daysLeft: 14,
    renewal: 'pending',
  },
  {
    id: 'LS-2022-015',
    name: 'Dallas Warehouse',
    type: 'Warehouse',
    daysLeft: 37,
    renewal: 'pending',
  },
  {
    id: 'LS-2022-031',
    name: 'Seattle Retail Location',
    type: 'Retail',
    daysLeft: 52,
    renewal: 'approved',
  },
  {
    id: 'LS-2022-044',
    name: 'Corporate Printer Fleet',
    type: 'Equipment',
    daysLeft: 78,
    renewal: 'declined',
  },
];

export function ExpiringLeases() {
  return (
    <div className="space-y-4">
      {expiringLeases.map((lease) => (
        <div
          key={lease.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarFallback className="bg-primary/10">
                {lease.type === 'Office Space' || lease.type === 'Retail' ? (
                  <Building2 className="h-4 w-4 text-chart-1" />
                ) : lease.type === 'Warehouse' ? (
                  <Building2 className="h-4 w-4 text-chart-3" />
                ) : (
                  <File className="h-4 w-4 text-chart-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="font-medium text-sm">{lease.name}</div>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Progress 
                    value={lease.daysLeft > 90 ? 100 : (lease.daysLeft / 90) * 100} 
                    className={cn(
                      "h-1.5 w-16",
                      lease.daysLeft <= 30 ? "text-red-600" : 
                      lease.daysLeft <= 60 ? "text-amber-500" : 
                      "text-emerald-500"
                    )} 
                  />
                  <span className="text-xs text-muted-foreground">
                    {lease.daysLeft} days left
                  </span>
                </div>
                <div className="flex items-center">
                  {lease.renewal === 'approved' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : lease.renewal === 'declined' ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button 
              variant={lease.renewal === 'pending' ? "default" : "outline"} 
              size="sm"
              className={cn(
                "text-xs",
                lease.renewal === 'approved' ? "text-emerald-500" : 
                lease.renewal === 'declined' ? "text-muted-foreground" : 
                ""
              )}
            >
              {lease.renewal === 'pending' 
                ? "Review" 
                : lease.renewal === 'approved' 
                ? "Renewing" 
                : "Ending"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}