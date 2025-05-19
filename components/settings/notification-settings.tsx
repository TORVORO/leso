"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, BellRing, Mail, MessageSquare, AlertTriangle, Clock, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const notificationCategories = [
  {
    title: 'Lease Events',
    description: 'Notifications related to lease lifecycle',
    icon: <Calendar className="h-5 w-5" />,
    settings: [
      { id: 'lease-expiry', label: 'Lease expiration alerts', description: 'Get notified when leases are near expiry', defaultChecked: true },
      { id: 'lease-renewal', label: 'Renewal reminders', description: 'Reminders for upcoming renewal decisions', defaultChecked: true },
      { id: 'lease-amendments', label: 'Lease amendments', description: 'Notifications about lease amendments', defaultChecked: true },
    ],
  },
  {
    title: 'Financial Alerts',
    description: 'Payment and financial notifications',
    icon: <AlertTriangle className="h-5 w-5" />,
    settings: [
      { id: 'payment-due', label: 'Payment due reminders', description: 'Reminders for upcoming lease payments', defaultChecked: true },
      { id: 'payment-made', label: 'Payment confirmations', description: 'Confirmations when payments are processed', defaultChecked: true },
      { id: 'budget-alerts', label: 'Budget threshold alerts', description: 'Notifications when expenses exceed thresholds', defaultChecked: false },
    ],
  },
  {
    title: 'Document Updates',
    description: 'Notifications about document changes',
    icon: <MessageSquare className="h-5 w-5" />,
    settings: [
      { id: 'document-upload', label: 'New document uploads', description: 'When new documents are added to the system', defaultChecked: true },
      { id: 'document-review', label: 'Document review requests', description: 'Requests to review uploaded documents', defaultChecked: true },
      { id: 'document-expiry', label: 'Document expiration', description: 'When documents are about to expire', defaultChecked: false },
    ],
  },
  {
    title: 'System Notifications',
    description: 'Application updates and maintenance',
    icon: <BellRing className="h-5 w-5" />,
    settings: [
      { id: 'maintenance', label: 'System maintenance', description: 'Scheduled maintenance notifications', defaultChecked: true },
      { id: 'feature-updates', label: 'Feature updates', description: 'New features and improvements', defaultChecked: true },
      { id: 'security-alerts', label: 'Security alerts', description: 'Important security-related notifications', defaultChecked: true },
    ],
  },
];

export function NotificationSettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Delivery</CardTitle>
          <CardDescription>Choose how you'd like to receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium" htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <BellRing className="mt-1 h-5 w-5 text-primary" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium" htmlFor="in-app-notifications">In-App Notifications</Label>
                    <Switch id="in-app-notifications" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <Label className="text-base font-medium">Notification Frequency</Label>
              <p className="text-sm text-muted-foreground">Choose how frequently you want to be notified</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input type="radio" id="real-time" name="frequency" className="accent-primary" defaultChecked />
                <Label htmlFor="real-time">Real-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="daily-digest" name="frequency" className="accent-primary" />
                <Label htmlFor="daily-digest">Daily digest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="weekly-summary" name="frequency" className="accent-primary" />
                <Label htmlFor="weekly-summary">Weekly summary</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {notificationCategories.map((category, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full p-2 bg-primary/10">
              {category.icon}
            </div>
            <div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id}>{setting.label}</Label>
                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Save Notification Preferences
        </Button>
      </div>
    </div>
  );
}