"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusIcon, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Upload,
  Building2,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LeaseTable } from '@/components/leases/lease-table';
import { LeaseFilters } from '@/components/leases/lease-filters';

export function LeasesPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lease Management</h2>
          <p className="text-muted-foreground">View and manage your lease portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Lease
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center sm:justify-between pb-3">
          <div>
            <CardTitle>Lease Portfolio</CardTitle>
            <CardDescription>
              Manage and analyze all active and upcoming leases
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leases..."
                className="pl-8 w-full md:w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                showFilters && "border-primary bg-primary/10"
              )}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Expiry Date (Soonest)</DropdownMenuItem>
                <DropdownMenuItem>Rent (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Rent (Low to High)</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        {showFilters && (
          <div className="px-6 pb-4 pt-0">
            <LeaseFilters />
          </div>
        )}

        <CardContent>
          <LeaseTable />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <LeaseInfoCard
          title="Real Estate Leases"
          description="Properties currently leased"
          icon={<Building2 className="h-4 w-4" />}
          count={24}
          changeAmount="+2"
          color="chart-1"
        />
        <LeaseInfoCard
          title="Equipment Leases"
          description="Machinery and equipment"
          icon={<FileText className="h-4 w-4" />}
          count={10}
          changeAmount="-1"
          color="chart-2"
        />
        <LeaseInfoCard
          title="Renewal Opportunities"
          description="Within next 120 days"
          icon={<Calendar className="h-4 w-4" />}
          count={8}
          changeAmount="+3"
          color="chart-3"
        />
      </div>
    </div>
  );
}

interface LeaseInfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  changeAmount: string;
  color: string;
}

function LeaseInfoCard({ title, description, icon, count, changeAmount, color }: LeaseInfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full bg-${color}/10 p-1`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {changeAmount.startsWith('+') ? (
            <span className="text-emerald-500">{changeAmount} from last month</span>
          ) : changeAmount.startsWith('-') ? (
            <span className="text-red-500">{changeAmount} from last month</span>
          ) : (
            <span>No change from last month</span>
          )}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              {count > 1 ? `${Math.min(count, 10)} locations` : "1 location"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Avg: 36 months</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}