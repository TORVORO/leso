"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, CheckCircle2, FileSymlink, Globe, HelpCircle, Phone, Upload, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CompanySettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Company settings saved",
      description: "Your company information has been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Manage your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl bg-primary/10">
                  <Building className="h-10 w-10 text-primary" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex gap-1">
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company name</Label>
                <Input id="company-name" defaultValue="Acme Corporation" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance & Banking</SelectItem>
                      <SelectItem value="retail">Retail & Consumer Goods</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="realestate">Real Estate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-500 employees)</SelectItem>
                      <SelectItem value="large">Large (501-1000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" type="url" defaultValue="https://acmecorp.com" />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address-line1">Address line 1</Label>
              <Input id="address-line1" defaultValue="123 Business Avenue" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address-line2">Address line 2</Label>
              <Input id="address-line2" defaultValue="Suite 1500" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="New York" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" defaultValue="NY" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal code</Label>
                <Input id="postal-code" defaultValue="10001" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue="us">
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Company Information
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your billing details and tax information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="billing-email">Billing email</Label>
            <Input id="billing-email" type="email" defaultValue="billing@acmecorp.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tax-id">Tax ID / VAT number</Label>
            <Input id="tax-id" defaultValue="US123456789" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billing-address">Use different billing address</Label>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="different-address" className="accent-primary" />
              <Label htmlFor="different-address">Billing address differs from company address</Label>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Need to update payment method?</p>
              <p className="text-muted-foreground mt-1">
                Your current plan: <span className="font-medium">Business Plan ($149/month)</span>
              </p>
              <Button variant="link" className="p-0 h-auto mt-1 text-primary">
                Manage subscription and payment methods
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Accounting Standards</CardTitle>
          <CardDescription>Configure your preferred accounting standards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary-standard">Primary accounting standard</Label>
            <Select defaultValue="fasb">
              <SelectTrigger id="primary-standard">
                <SelectValue placeholder="Select primary standard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fasb">FASB ASC 842 (US GAAP)</SelectItem>
                <SelectItem value="ifrs">IFRS 16</SelectItem>
                <SelectItem value="gasb">GASB 87</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondary-standard">Secondary accounting standard (optional)</Label>
            <Select defaultValue="ifrs">
              <SelectTrigger id="secondary-standard">
                <SelectValue placeholder="Select secondary standard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="fasb">FASB ASC 842 (US GAAP)</SelectItem>
                <SelectItem value="ifrs">IFRS 16</SelectItem>
                <SelectItem value="gasb">GASB 87</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fiscal-year-end">Fiscal year end</Label>
            <Select defaultValue="dec">
              <SelectTrigger id="fiscal-year-end">
                <SelectValue placeholder="Select fiscal year end" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan">January 31</SelectItem>
                <SelectItem value="feb">February 28/29</SelectItem>
                <SelectItem value="mar">March 31</SelectItem>
                <SelectItem value="apr">April 30</SelectItem>
                <SelectItem value="may">May 31</SelectItem>
                <SelectItem value="jun">June 30</SelectItem>
                <SelectItem value="jul">July 31</SelectItem>
                <SelectItem value="aug">August 31</SelectItem>
                <SelectItem value="sep">September 30</SelectItem>
                <SelectItem value="oct">October 31</SelectItem>
                <SelectItem value="nov">November 30</SelectItem>
                <SelectItem value="dec">December 31</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Default currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select default currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar</SelectItem>
                <SelectItem value="eur">EUR - Euro</SelectItem>
                <SelectItem value="gbp">GBP - British Pound</SelectItem>
                <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
                <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Standards
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}