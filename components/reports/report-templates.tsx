"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  Clock,
  User,
  Filter,
  PlusCircle,
  Check,
  ArrowDownUp
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Sample data for report templates
const reportTemplates = [
  {
    id: 1,
    name: 'Monthly Financial Summary',
    description: 'Standard monthly financial report with expense analysis',
    creator: 'System',
    lastUsed: '2 days ago',
    type: 'financial',
    isShared: true,
  },
  {
    id: 2,
    name: 'Quarterly ASC 842 Compliance',
    description: 'Comprehensive FASB ASC 842 compliance report',
    creator: 'System',
    lastUsed: '1 week ago',
    type: 'compliance',
    isShared: true,
  },
  {
    id: 3,
    name: 'Annual Portfolio Overview',
    description: 'Complete overview of all leases with expiry analysis',
    creator: 'John Smith',
    lastUsed: '2 weeks ago',
    type: 'overview',
    isShared: false,
  },
  {
    id: 4,
    name: 'Executive Dashboard',
    description: 'High-level summary for executive team review',
    creator: 'You',
    lastUsed: '1 month ago',
    type: 'overview',
    isShared: true,
  },
  {
    id: 5,
    name: 'Lease Expiry Alert',
    description: 'Report of all leases expiring in the next 6 months',
    creator: 'You',
    lastUsed: '2 months ago',
    type: 'expiry',
    isShared: false,
  },
];

export function ReportTemplates() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
  const toggleRow = (id: number) => {
    setSelectedRows({
      ...selectedRows,
      [id]: !selectedRows[id],
    });
  };
  
  const toggleAll = () => {
    const allSelected = reportTemplates.every(template => selectedRows[template.id]);
    
    if (allSelected) {
      setSelectedRows({});
    } else {
      const newSelected: Record<string, boolean> = {};
      reportTemplates.forEach(template => {
        newSelected[template.id] = true;
      });
      setSelectedRows(newSelected);
    }
  };
  
  const isAllSelected = reportTemplates.every(template => selectedRows[template.id]);
  const isSomeSelected = !isAllSelected && reportTemplates.some(template => selectedRows[template.id]);
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">Report Templates</h3>
          <div className="text-sm text-muted-foreground">Reusable report configurations</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none border-0 h-8",
                view === 'grid' ? "bg-muted" : "bg-transparent"
              )}
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none border-0 h-8",
                view === 'list' ? "bg-muted" : "bg-transparent"
              )}
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              className="pl-8 w-full md:w-[240px]"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>
      
      {selectedCount > 0 && (
        <div className="mb-4 p-2 bg-muted rounded-md flex items-center justify-between">
          <span className="text-sm">{selectedCount} {selectedCount === 1 ? 'template' : 'templates'} selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
      
      {view === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((template) => (
            <Card key={template.id} className="group overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1">
                <div className={cn(
                  "h-full w-full",
                  template.type === 'financial' ? "bg-emerald-500" :
                  template.type === 'compliance' ? "bg-purple-500" :
                  template.type === 'overview' ? "bg-blue-500" :
                  "bg-amber-500"
                )} />
              </div>
              <CardHeader className="pt-6 pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        template.type === 'financial' 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" 
                          : template.type === 'overview'
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                          : template.type === 'expiry'
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      )}
                    >
                      {template.type}
                    </Badge>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                  <Checkbox 
                    checked={selectedRows[template.id]} 
                    onCheckedChange={() => toggleRow(template.id)}
                    className="opacity-0 group-hover:opacity-100"
                  />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription className="line-clamp-2">{template.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between pt-0 pb-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  <span>{template.creator}</span>
                  {template.isShared && (
                    <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4 bg-muted">
                      Shared
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Used {template.lastUsed}</span>
                </div>
              </CardFooter>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="mb-2">
                  <FileBarChart2 className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          <Card className="flex flex-col items-center justify-center h-[180px] border-dashed hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Create Template</span>
            <span className="text-xs text-muted-foreground">Design a new report template</span>
          </Card>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={isAllSelected} 
                    indeterminate={isSomeSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedRows[template.id]} 
                      onCheckedChange={() => toggleRow(template.id)}
                      aria-label={`Select ${template.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{template.name}</span>
                      <span className="text-xs text-muted-foreground">{template.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        template.type === 'financial' 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" 
                          : template.type === 'overview'
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                          : template.type === 'expiry'
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      )}
                    >
                      {template.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {template.creator}
                      {template.isShared && (
                        <Badge variant="outline" className="text-[10px] py-0 h-4 bg-muted">
                          Shared
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{template.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm">
                        Use
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}