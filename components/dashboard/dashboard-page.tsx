"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecentLeases } from '@/components/dashboard/recent-leases';
import { ExpiringLeases } from '@/components/dashboard/expiring-leases';
import { LeaseStatisticsChart } from '@/components/dashboard/lease-statistics-chart';
import { LeasesByTypeChart } from '@/components/dashboard/leases-by-type-chart';
import { LeasesSummaryCards } from '@/components/dashboard/leases-summary-cards';
import { LeaseActivityFeed } from '@/components/dashboard/lease-activity-feed';
import { Button } from '@/components/ui/button';
import { PlusIcon, ArrowRightIcon, FileTextIcon, UploadIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const showWelcomeToast = () => {
    toast({
      title: "Welcome to LeaseSync! 👋",
      description: "Your modern lease accounting solution is ready to use.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={showWelcomeToast}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload Lease
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Lease
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <LeasesSummaryCards />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Lease Statistics</CardTitle>
                <CardDescription>Monthly lease expenses and assets over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaseStatisticsChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Leases by Type</CardTitle>
                <CardDescription>Distribution of lease types in portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <LeasesByTypeChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Leases</CardTitle>
                  <CardDescription>Recently added or modified leases</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <RecentLeases />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Expiring Leases</CardTitle>
                  <CardDescription>Leases expiring within 90 days</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ExpiringLeases />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Lease Activity</CardTitle>
                <CardDescription>Recent activity across your leases</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaseActivityFeed />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Generate FASB ASC 842 Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Generate IFRS 16 Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Bulk Upload Leases
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Export Lease Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}