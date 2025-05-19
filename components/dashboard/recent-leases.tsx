"use client";

import { Building2, File, MapPin, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const recentLeases = [
  {
    id: 'LS-2023-001',
    name: 'Corporate HQ - Floor 12',
    type: 'Office Space',
    location: 'New York, NY',
    added: 'June 10, 2024',
    status: 'active',
  },
  {
    id: 'LS-2023-002',
    name: 'Downtown Retail Store',
    type: 'Retail',
    location: 'Chicago, IL',
    added: 'June 8, 2024',
    status: 'draft',
  },
  {
    id: 'LS-2023-003',
    name: 'East Coast Distribution Center',
    type: 'Warehouse',
    location: 'Newark, NJ',
    added: 'June 5, 2024',
    status: 'active',
  },
  {
    id: 'LS-2023-004',
    name: 'Delivery Fleet Vehicles (10)',
    type: 'Vehicles',
    location: 'Multiple',
    added: 'June 2, 2024',
    status: 'active',
  },
];

export function RecentLeases() {
  return (
    <div className="space-y-4">
      {recentLeases.map((lease) => (
        <div
          key={lease.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarFallback className="bg-primary/10">
                {lease.type === 'Office Space' ? (
                  <Building2 className="h-4 w-4 text-chart-1" />
                ) : lease.type === 'Retail' ? (
                  <Building2 className="h-4 w-4 text-chart-2" />
                ) : lease.type === 'Warehouse' ? (
                  <Building2 className="h-4 w-4 text-chart-3" />
                ) : (
                  <File className="h-4 w-4 text-chart-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{lease.name}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-1 py-0 h-4 rounded-sm",
                    lease.status === 'active' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" :
                    lease.status === 'draft' ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800" : ""
                  )}
                >
                  {lease.status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{lease.type}</span>
                <span className="mx-1">•</span>
                <MapPin className="h-3 w-3 mr-0.5" />
                <span>{lease.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}