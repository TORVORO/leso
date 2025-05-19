"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Download, 
  Edit, 
  Copy, 
  FileText, 
  Trash, 
  Calendar, 
  DollarSign, 
  Clock, 
  Building,
  MapPin,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Users,
  BarChart4
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { LeasePaymentSchedule } from '@/components/leases/lease-payment-schedule';
import { LeaseDocuments } from '@/components/leases/lease-documents';
import { LeaseTimeline } from '@/components/leases/lease-timeline';
import { LeaseDetails } from '@/components/leases/lease-details';

interface LeaseDetailsPageProps {
  id: string;
}

export function LeaseDetailsPage({ id }: LeaseDetailsPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  
  // This would normally come from an API call or database
  const lease = {
    id,
    name: 'Corporate HQ - Floor 12',
    type: 'Office Space',
    location: 'New York, NY',
    address: '123 Business Plvd, Floor 12, New York, NY 10001',
    startDate: '01/15/2023',
    endDate: '01/14/2026',
    term: '36 months',
    monthlyRent: '$42,500',
    annualRent: '$510,000',
    securityDeposit: '$127,500',
    status: 'active',
    nextPaymentDate: '07/15/2024',
    nextPaymentAmount: '$42,500',
    totalRemainingPayments: '19',
    totalRemainingValue: '$807,500',
    renewalOption: 'Yes (2 periods of 24 months each)',
    noticeRequired: '6 months',
    documents: [
      { name: 'Original Lease Agreement', date: '12/20/2022', type: 'primary' },
      { name: 'Floor Plan', date: '12/20/2022', type: 'supporting' },
      { name: 'First Amendment', date: '03/15/2023', type: 'amendment' },
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{lease.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">{lease.id}</span>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize",
                  lease.status === 'active' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" : ""
                )}
              >
                {lease.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{lease.type}</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{lease.location}</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{lease.term}</CardTitle>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{lease.monthlyRent}/mo</CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-6">
                <TabsList className="h-12 bg-transparent p-0 w-full justify-start space-x-6">
                  <TabsTrigger 
                    value="details" 
                    className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent h-12 text-sm py-0"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payments" 
                    className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent h-12 text-sm py-0"
                  >
                    Payments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents" 
                    className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent h-12 text-sm py-0"
                  >
                    Documents
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent h-12 text-sm py-0"
                  >
                    History
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="details" className="p-6 pt-0 mt-4">
                <LeaseDetails lease={lease} />
              </TabsContent>
              
              <TabsContent value="payments" className="p-6 pt-0 mt-4">
                <LeasePaymentSchedule />
              </TabsContent>
              
              <TabsContent value="documents" className="p-6 pt-0 mt-4">
                <LeaseDocuments documents={lease.documents} />
              </TabsContent>
              
              <TabsContent value="history" className="p-6 pt-0 mt-4">
                <LeaseTimeline />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Next Payment</CardTitle>
              <CardDescription>Upcoming lease obligation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Due Date</div>
                  <div className="font-medium">{lease.nextPaymentDate}</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="font-medium">{lease.nextPaymentAmount}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Remaining</div>
                  <div className="font-medium">{lease.totalRemainingPayments} payments</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-sm text-muted-foreground">Total Value</div>
                  <div className="font-medium">{lease.totalRemainingValue}</div>
                </div>
              </div>
              <Button className="w-full mt-2">Record Payment</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Dates</CardTitle>
              <CardDescription>Important upcoming events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-red-600 dark:text-red-300" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Renewal Decision</div>
                    <div className="text-xs text-muted-foreground">Due by July 14, 2025</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">CPI Adjustment</div>
                    <div className="text-xs text-muted-foreground">January 15, 2025</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Lease Expiration</div>
                    <div className="text-xs text-muted-foreground">January 14, 2026</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-2">
              <Button variant="ghost" className="w-full justify-start text-left">
                <CheckCircle className="h-4 w-4 mr-2" />
                Generate FASB Abstract
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left">
                <BarChart4 className="h-4 w-4 mr-2" />
                Run Amortization Schedule
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left">
                <Users className="h-4 w-4 mr-2" />
                Manage Stakeholders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}