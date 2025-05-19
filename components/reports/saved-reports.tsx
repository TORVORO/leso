"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText, 
  Search, 
  FileBarChart2, 
  Download, 
  Star, 
  MoreHorizontal, 
  Trash, 
  Edit, 
  Copy,
  Clock
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Sample data for saved reports
const savedReports = [
  {
    id: 1,
    name: 'Q2 2024 Financial Analysis',
    description: 'Comprehensive financial analysis for Q2 2024',
    date: 'Jun 12, 2024',
    type: 'financial',
    format: 'PDF',
    size: '2.4 MB',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Annual Lease Portfolio Overview',
    description: 'Complete overview of all active leases',
    date: 'Jun 1, 2024',
    type: 'overview',
    format: 'Excel',
    size: '4.8 MB',
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Lease Expiry Analysis 2024-2025',
    description: 'Analysis of leases expiring in next 18 months',
    date: 'May 28, 2024',
    type: 'expiry',
    format: 'PDF',
    size: '1.7 MB',
    isFavorite: false,
  },
  {
    id: 4,
    name: 'ASC 842 Compliance Report',
    description: 'FASB ASC 842 compliance documentation',
    date: 'May 15, 2024',
    type: 'compliance',
    format: 'PDF',
    size: '3.2 MB',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Monthly Expense Forecast Q3-Q4',
    description: 'Projected lease expenses for remainder of fiscal year',
    date: 'May 10, 2024',
    type: 'financial',
    format: 'Excel',
    size: '1.9 MB',
    isFavorite: false,
  },
  {
    id: 6,
    name: 'Retail Leases Performance Analysis',
    description: 'Performance metrics for retail property leases',
    date: 'Apr 29, 2024',
    type: 'overview',
    format: 'PDF',
    size: '2.1 MB',
    isFavorite: false,
  },
];

export function SavedReports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">My Reports</h3>
          <div className="text-sm text-muted-foreground">All of your generated reports</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports..."
              className="pl-8 w-full md:w-[240px]"
            />
          </div>
          <Button>
            <FileBarChart2 className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {savedReports.map((report) => (
          <Card key={report.id} className="group">
            <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "mr-2",
                      report.type === 'financial' 
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" 
                        : report.type === 'overview'
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                        : report.type === 'expiry'
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                    )}
                  >
                    {report.type}
                  </Badge>
                  <Badge variant="outline" className="bg-muted text-muted-foreground border-muted">
                    {report.format}
                  </Badge>
                </div>
                <CardTitle className="text-base">{report.name}</CardTitle>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-8 w-8", 
                    report.isFavorite ? "text-amber-500" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Star className="h-4 w-4 fill-current" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileBarChart2 className="h-4 w-4 mr-2" />
                      Run Again
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-2">
              <CardDescription className="line-clamp-2">{report.description}</CardDescription>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{report.date}</span>
                </div>
                <span>{report.size}</span>
              </div>
              
              <div className="pt-2">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}