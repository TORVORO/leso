"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Download, Pencil, Trash, ExternalLink, Building2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Sample data
const leases = [
  {
    id: 'LS-2023-001',
    name: 'Corporate HQ - Floor 12',
    type: 'Office Space',
    location: 'New York, NY',
    startDate: '01/15/2023',
    endDate: '01/14/2026',
    monthlyRent: '$42,500',
    status: 'active',
  },
  {
    id: 'LS-2023-002',
    name: 'Downtown Retail Store',
    type: 'Retail',
    location: 'Chicago, IL',
    startDate: '03/01/2023',
    endDate: '02/28/2028',
    monthlyRent: '$35,750',
    status: 'active',
  },
  {
    id: 'LS-2023-003',
    name: 'East Coast Distribution Center',
    type: 'Warehouse',
    location: 'Newark, NJ',
    startDate: '04/01/2023',
    endDate: '03/31/2028',
    monthlyRent: '$62,000',
    status: 'active',
  },
  {
    id: 'LS-2023-004',
    name: 'Delivery Fleet Vehicles (10)',
    type: 'Vehicles',
    location: 'Multiple',
    startDate: '02/15/2023',
    endDate: '02/14/2026',
    monthlyRent: '$12,500',
    status: 'active',
  },
  {
    id: 'LS-2023-005',
    name: 'West Coast Office',
    type: 'Office Space',
    location: 'San Francisco, CA',
    startDate: '05/01/2023',
    endDate: '04/30/2026',
    monthlyRent: '$51,200',
    status: 'active',
  },
  {
    id: 'LS-2023-006',
    name: 'Manufacturing Equipment Lease',
    type: 'Equipment',
    location: 'Detroit, MI',
    startDate: '06/01/2023',
    endDate: '05/31/2028',
    monthlyRent: '$28,750',
    status: 'active',
  },
  {
    id: 'LS-2023-007',
    name: 'Southwest Regional Office',
    type: 'Office Space',
    location: 'Austin, TX',
    startDate: '07/15/2023',
    endDate: '07/14/2026',
    monthlyRent: '$31,400',
    status: 'draft',
  },
  {
    id: 'LS-2023-008',
    name: 'R&D Facility',
    type: 'Office Space',
    location: 'Boston, MA',
    startDate: '08/01/2023',
    endDate: '07/31/2028',
    monthlyRent: '$47,800',
    status: 'pending approval',
  },
];

export function LeaseTable() {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
  const toggleRow = (id: string) => {
    setSelectedRows({
      ...selectedRows,
      [id]: !selectedRows[id],
    });
  };
  
  const toggleAll = () => {
    const allSelected = leases.every(lease => selectedRows[lease.id]);
    
    if (allSelected) {
      setSelectedRows({});
    } else {
      const newSelected: Record<string, boolean> = {};
      leases.forEach(lease => {
        newSelected[lease.id] = true;
      });
      setSelectedRows(newSelected);
    }
  };
  
  const isAllSelected = leases.every(lease => selectedRows[lease.id]);
  const isSomeSelected = !isAllSelected && leases.some(lease => selectedRows[lease.id]);
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  return (
    <div>
      {selectedCount > 0 && (
        <div className="mb-4 p-2 bg-muted rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedCount} {selectedCount === 1 ? 'lease' : 'leases'} selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12 p-0">
                <div className="flex items-center justify-center h-10">
                  <Checkbox 
                    checked={isAllSelected} 
                    indeterminate={isSomeSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </div>
              </TableHead>
              <TableHead>Lease</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Term</TableHead>
              <TableHead className="text-right">Monthly Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leases.map((lease) => (
              <TableRow key={lease.id} className="group">
                <TableCell className="p-0">
                  <div className="flex items-center justify-center h-12">
                    <Checkbox 
                      checked={selectedRows[lease.id]} 
                      onCheckedChange={() => toggleRow(lease.id)}
                      aria-label={`Select ${lease.name}`}
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/leases/${lease.id}`} className="hover:underline block">
                    {lease.name}
                    <div className="text-xs text-muted-foreground">{lease.id}</div>
                  </Link>
                </TableCell>
                <TableCell>{lease.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{lease.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    <div>Start: {lease.startDate}</div>
                    <div>End: {lease.endDate}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{lease.monthlyRent}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      lease.status === 'active' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" :
                      lease.status === 'draft' ? "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800" :
                      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                    )}
                  >
                    {lease.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100"
                      >
                        <EllipsisVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Lease
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{leases.length}</span> of <span className="font-medium">{leases.length}</span> leases
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}