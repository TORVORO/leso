"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BarChart, LineChart, PieChart, FileText, Download, Calendar, Filter, ArrowRight, FileBarChart2, Share2 } from 'lucide-react';
import { StatisticsCharts } from '@/components/reports/statistics-charts';
import { SavedReports } from '@/components/reports/saved-reports';
import { ReportTemplates } from '@/components/reports/report-templates';

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('analysis');

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-muted-foreground">Generate insights from your lease portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <FileBarChart2 className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>Customize your lease analysis report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select defaultValue="overview">
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overview">Portfolio Overview</SelectItem>
                          <SelectItem value="financial">Financial Analysis</SelectItem>
                          <SelectItem value="expiry">Expiry Analysis</SelectItem>
                          <SelectItem value="utilization">Space Utilization</SelectItem>
                          <SelectItem value="compliance">Compliance Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time Period</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="ytd">Year to Date</SelectItem>
                          <SelectItem value="1y">Last 12 Months</SelectItem>
                          <SelectItem value="3y">Last 3 Years</SelectItem>
                          <SelectItem value="5y">Last 5 Years</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Lease Type</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select lease type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="office">Office Space</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="vehicles">Vehicles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Accounting Standard</Label>
                      <Select defaultValue="fasb">
                        <SelectTrigger>
                          <SelectValue placeholder="Select standard" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fasb">FASB ASC 842</SelectItem>
                          <SelectItem value="ifrs">IFRS 16</SelectItem>
                          <SelectItem value="gasb">GASB 87</SelectItem>
                          <SelectItem value="both">FASB & IFRS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Group By</Label>
                      <Select defaultValue="type">
                        <SelectTrigger>
                          <SelectValue placeholder="Select grouping" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type">Lease Type</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="department">Department</SelectItem>
                          <SelectItem value="classification">Accounting Classification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-charts">Include Charts</Label>
                        <Switch id="include-charts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-forecasts">Include Forecasts</Label>
                        <Switch id="include-forecasts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-audit">Include Audit Trail</Label>
                        <Switch id="include-audit" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="mr-2">Save Template</Button>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Output Format</CardTitle>
                  <CardDescription>Choose report format</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="pdf" name="format" className="accent-primary" defaultChecked />
                    <Label htmlFor="pdf" className="cursor-pointer">PDF Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="excel" name="format" className="accent-primary" />
                    <Label htmlFor="excel" className="cursor-pointer">Excel Spreadsheet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="csv" name="format" className="accent-primary" />
                    <Label htmlFor="csv" className="cursor-pointer">CSV File</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="web" name="format" className="accent-primary" />
                    <Label htmlFor="web" className="cursor-pointer">Interactive Dashboard</Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Previously generated</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Financial Summary Q2</div>
                        <div className="text-xs text-muted-foreground">Generated 2 days ago</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Expiry Analysis 2024</div>
                        <div className="text-xs text-muted-foreground">Generated 1 week ago</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" className="w-full text-sm" size="sm">
                    View All Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Analytics Preview</CardTitle>
              <CardDescription>Real-time data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <StatisticsCharts />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          <SavedReports />
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <ReportTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}