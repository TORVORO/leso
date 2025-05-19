"use client";

import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, DollarSign, Download, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for payment schedule
const paymentSchedule = [
  { id: 1, period: 'Jan 2023', amount: '$42,500', status: 'paid', dueDate: '01/15/2023', paidDate: '01/12/2023' },
  { id: 2, period: 'Feb 2023', amount: '$42,500', status: 'paid', dueDate: '02/15/2023', paidDate: '02/14/2023' },
  { id: 3, period: 'Mar 2023', amount: '$42,500', status: 'paid', dueDate: '03/15/2023', paidDate: '03/13/2023' },
  { id: 4, period: 'Apr 2023', amount: '$42,500', status: 'paid', dueDate: '04/15/2023', paidDate: '04/14/2023' },
  { id: 5, period: 'May 2023', amount: '$42,500', status: 'paid', dueDate: '05/15/2023', paidDate: '05/15/2023' },
  { id: 6, period: 'Jun 2023', amount: '$42,500', status: 'paid', dueDate: '06/15/2023', paidDate: '06/14/2023' },
  { id: 7, period: 'Jul 2023', amount: '$42,500', status: 'paid', dueDate: '07/15/2023', paidDate: '07/14/2023' },
  { id: 8, period: 'Aug 2023', amount: '$42,500', status: 'paid', dueDate: '08/15/2023', paidDate: '08/15/2023' },
  { id: 9, period: 'Sep 2023', amount: '$42,500', status: 'paid', dueDate: '09/15/2023', paidDate: '09/14/2023' },
  { id: 10, period: 'Oct 2023', amount: '$42,500', status: 'paid', dueDate: '10/15/2023', paidDate: '10/13/2023' },
  { id: 11, period: 'Nov 2023', amount: '$42,500', status: 'paid', dueDate: '11/15/2023', paidDate: '11/14/2023' },
  { id: 12, period: 'Dec 2023', amount: '$42,500', status: 'paid', dueDate: '12/15/2023', paidDate: '12/14/2023' },
  { id: 13, period: 'Jan 2024', amount: '$42,500', status: 'paid', dueDate: '01/15/2024', paidDate: '01/12/2024' },
  { id: 14, period: 'Feb 2024', amount: '$42,500', status: 'paid', dueDate: '02/15/2024', paidDate: '02/14/2024' },
  { id: 15, period: 'Mar 2024', amount: '$42,500', status: 'paid', dueDate: '03/15/2024', paidDate: '03/14/2024' },
  { id: 16, period: 'Apr 2024', amount: '$42,500', status: 'paid', dueDate: '04/15/2024', paidDate: '04/15/2024' },
  { id: 17, period: 'May 2024', amount: '$42,500', status: 'paid', dueDate: '05/15/2024', paidDate: '05/14/2024' },
  { id: 18, period: 'Jun 2024', amount: '$42,500', status: 'paid', dueDate: '06/15/2024', paidDate: '06/13/2024' },
  { id: 19, period: 'Jul 2024', amount: '$42,500', status: 'due', dueDate: '07/15/2024', paidDate: null },
  { id: 20, period: 'Aug 2024', amount: '$42,500', status: 'upcoming', dueDate: '08/15/2024', paidDate: null },
  { id: 21, period: 'Sep 2024', amount: '$42,500', status: 'upcoming', dueDate: '09/15/2024', paidDate: null },
  { id: 22, period: 'Oct 2024', amount: '$42,500', status: 'upcoming', dueDate: '10/15/2024', paidDate: null },
  { id: 23, period: 'Nov 2024', amount: '$42,500', status: 'upcoming', dueDate: '11/15/2024', paidDate: null },
  { id: 24, period: 'Dec 2024', amount: '$42,500', status: 'upcoming', dueDate: '12/15/2024', paidDate: null },
];

// Calculate completion
const paidCount = paymentSchedule.filter(payment => payment.status === 'paid').length;
const completionPercentage = (paidCount / paymentSchedule.length) * 100;

export function LeasePaymentSchedule() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [visibleRows, setVisibleRows] = useState(10);
  
  // Filter payments based on status
  const filteredPayments = statusFilter === 'all' 
    ? paymentSchedule 
    : paymentSchedule.filter(payment => payment.status === statusFilter);
  
  // Display limited rows with option to show more
  const displayedPayments = filteredPayments.slice(0, visibleRows);
  
  const loadMore = () => {
    setVisibleRows(prev => Math.min(prev + 10, filteredPayments.length));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">Payment Schedule</h3>
          <div className="text-sm text-muted-foreground">View and manage lease payments</div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="due">Due Now</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Payment Completion</span>
          <span className="text-sm">{paidCount} of {paymentSchedule.length} payments ({completionPercentage.toFixed(0)}%)</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Period</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedPayments.map((payment) => (
              <TableRow key={payment.id} className="group">
                <TableCell className="font-medium">{payment.period}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      payment.status === 'paid' 
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" 
                        : payment.status === 'due' 
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {payment.status === 'paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {payment.paidDate || '-'}
                </TableCell>
                <TableCell className="text-right">
                  {payment.status === 'paid' ? (
                    <Button variant="ghost" size="sm" className="h-7 opacity-70 group-hover:opacity-100">
                      <FileText className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  ) : payment.status === 'due' ? (
                    <Button size="sm" className="h-7">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Pay Now
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="h-7">
                      Schedule
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {visibleRows < filteredPayments.length && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}