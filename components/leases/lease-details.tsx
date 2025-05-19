"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, ExternalLink, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeaseDetailsProps {
  lease: any; // Would normally type this properly
}

export function LeaseDetails({ lease }: LeaseDetailsProps) {
  const { toast } = useToast();
  
  const copyAddress = () => {
    navigator.clipboard.writeText(lease.address);
    toast({
      title: "Address copied",
      description: "The address has been copied to your clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Property Details</h3>
            <div className="mt-2 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Address</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-right">{lease.address}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 ml-1" onClick={copyAddress}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Property Type</span>
                <span className="text-sm font-medium">{lease.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="text-sm font-medium">12,500 sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Floor</span>
                <span className="text-sm font-medium">12</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Lease Terms</h3>
            <div className="mt-2 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date</span>
                <span className="text-sm font-medium">{lease.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">End Date</span>
                <span className="text-sm font-medium">{lease.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Term Length</span>
                <span className="text-sm font-medium">{lease.term}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Renewal Option</span>
                <span className="text-sm font-medium">{lease.renewalOption}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Notice Required</span>
                <span className="text-sm font-medium">{lease.noticeRequired}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Financial Details</h3>
            <div className="mt-2 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Rent</span>
                <span className="text-sm font-medium">{lease.monthlyRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Annual Rent</span>
                <span className="text-sm font-medium">{lease.annualRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Security Deposit</span>
                <span className="text-sm font-medium">{lease.securityDeposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rent per Sq Ft</span>
                <span className="text-sm font-medium">$40.80/sq ft/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment Frequency</span>
                <span className="text-sm font-medium">Monthly</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="mt-2 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Landlord</span>
                <span className="text-sm font-medium">Empire State Properties LLC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Property Manager</span>
                <span className="text-sm font-medium">Sarah Johnson</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Emergency Contact</span>
                <span className="text-sm font-medium">Building Services (212-555-1212)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Internal Contact</span>
                <span className="text-sm font-medium">Mark Wilson (Facilities)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="accounting">
          <AccordionTrigger>Accounting Classification</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">FASB Classification</span>
                <span className="text-sm font-medium">Finance Lease</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">IFRS Classification</span>
                <span className="text-sm font-medium">Finance Lease</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Right-of-Use Asset</span>
                <span className="text-sm font-medium">$1,234,567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lease Liability</span>
                <span className="text-sm font-medium">$1,187,432</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Depreciation</span>
                <span className="text-sm font-medium">$34,293</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Interest</span>
                <span className="text-sm font-medium">$8,207</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="special">
          <AccordionTrigger>Special Clauses</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Early Termination</span>
                <span className="text-sm font-medium">Yes, with 12 months notice + 3 months penalty</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sublease Rights</span>
                <span className="text-sm font-medium">Yes, with landlord approval</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Expansion Rights</span>
                <span className="text-sm font-medium">First right of refusal on Floor 11</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Improvement Allowance</span>
                <span className="text-sm font-medium">$40/sq ft ($500,000 total)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Annual Escalation</span>
                <span className="text-sm font-medium">3% fixed</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="notes">
          <AccordionTrigger>Notes & Reminders</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <div className="font-medium text-sm">Critical Dates:</div>
                <p className="text-sm mt-1">
                  - Renewal decision due by July 14, 2025 (6 months before expiry)<br />
                  - CPI adjustment occurs on January 15, 2025 (Year 2)<br />
                  - Annual reconciliation of operating expenses due in March each year
                </p>
              </div>
              
              <div className="rounded-md bg-muted p-3">
                <div className="font-medium text-sm">Building Info:</div>
                <p className="text-sm mt-1">
                  - Building hours: 7am - 7pm weekdays, 8am - 2pm weekends<br />
                  - After hours HVAC requests: $150/hour<br />
                  - Loading dock reservations must be made 24 hours in advance
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-muted/50 flex items-center justify-between">
          <h3 className="font-medium">Property Location</h3>
          <Button variant="ghost" size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4 mr-1" />
            Open in Maps
          </Button>
        </div>
        <div className="p-4 h-64 relative bg-muted flex items-center justify-center">
          <div className="space-y-2 text-center">
            <MapPin className="h-8 w-8 mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">{lease.address}</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}