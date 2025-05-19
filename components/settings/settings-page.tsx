"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CheckIcon, Save, Settings2, User, Building, BellRing, ShieldCheck, Languages, KeyRound } from 'lucide-react';
import { AccountSettings } from '@/components/settings/account-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { CompanySettings } from '@/components/settings/company-settings';
import { SecuritySettings } from '@/components/settings/security-settings';
import { AppearanceSettings } from '@/components/settings/appearance-settings';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between">
          <TabsList className="grid grid-cols-5 w-full lg:w-[600px]">
            <TabsTrigger value="account" className="text-xs md:text-sm">
              <User className="mr-1 h-4 w-4 hidden sm:block" />
              Account
            </TabsTrigger>
            <TabsTrigger value="company" className="text-xs md:text-sm">
              <Building className="mr-1 h-4 w-4 hidden sm:block" />
              Company
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm">
              <BellRing className="mr-1 h-4 w-4 hidden sm:block" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs md:text-sm">
              <ShieldCheck className="mr-1 h-4 w-4 hidden sm:block" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs md:text-sm">
              <Settings2 className="mr-1 h-4 w-4 hidden sm:block" />
              Appearance
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="account" className="space-y-4">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="company" className="space-y-4">
          <CompanySettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}