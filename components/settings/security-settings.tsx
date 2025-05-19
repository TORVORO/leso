"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, LockIcon, Shield, SmartphoneIcon, Clock, AlertTriangle, KeyIcon, InfoIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SecuritySettings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Management</CardTitle>
          <CardDescription>Update your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <Input id="current-password" type="password" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" />
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 12 characters with mixed case, numbers, and symbols
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Password best practices</AlertTitle>
            <AlertDescription className="text-sm">
              Use a unique password that you don't use for other accounts. Consider using a password manager to generate and store complex passwords.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Update Password</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Enhance your account security with 2FA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Enable two-factor authentication</Label>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <Switch id="2fa" />
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="text-sm font-medium">Choose 2FA method:</div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <SmartphoneIcon className="mt-1 h-5 w-5 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <input type="radio" id="authenticator-app" name="2fa-method" className="accent-primary" defaultChecked />
                  <Label htmlFor="authenticator-app" className="ml-2 font-medium cursor-pointer">Authenticator App</Label>
                </div>
                <p className="text-sm text-muted-foreground">Use an app like Google Authenticator or Authy</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <SmartphoneIcon className="mt-1 h-5 w-5 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <input type="radio" id="sms" name="2fa-method" className="accent-primary" />
                  <Label htmlFor="sms" className="ml-2 font-medium cursor-pointer">SMS Authentication</Label>
                </div>
                <p className="text-sm text-muted-foreground">Receive codes via text message</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <KeyIcon className="mt-1 h-5 w-5 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <input type="radio" id="security-key" name="2fa-method" className="accent-primary" />
                  <Label htmlFor="security-key" className="ml-2 font-medium cursor-pointer">Security Key</Label>
                </div>
                <p className="text-sm text-muted-foreground">Use a physical security key (FIDO2)</p>
              </div>
            </div>
          </div>
          
          <div className="mt-2">
            <Button variant="outline">Set Up 2FA</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Session & Login Security</CardTitle>
          <CardDescription>Manage your active sessions and login options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-logout">Automatic logout</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically log out after a period of inactivity
                </div>
              </div>
              <Switch id="auto-logout" defaultChecked />
            </div>
            
            <div className="ml-7">
              <div className="space-y-2">
                <Label htmlFor="logout-time">Inactivity timeout</Label>
                <select id="logout-time" className="w-full border rounded-md p-2">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60" selected>1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="480">8 hours</option>
                </select>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="text-sm font-medium mb-2">Active Sessions</div>
            <div className="space-y-3">
              <div className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-primary" />
                  <div className="space-y-1">
                    <div className="font-medium text-sm">Current Session</div>
                    <div className="text-xs text-muted-foreground">Chrome on Windows • New York, USA</div>
                    <div className="text-xs text-muted-foreground">Started 45 minutes ago</div>
                  </div>
                </div>
                <Badge variant="secondary">Current</Badge>
              </div>
              
              <div className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div className="space-y-1">
                    <div className="font-medium text-sm">Safari on Mac</div>
                    <div className="text-xs text-muted-foreground">New York, USA</div>
                    <div className="text-xs text-muted-foreground">Last active 2 days ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">Revoke</Button>
              </div>
              
              <div className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div className="space-y-1">
                    <div className="font-medium text-sm">iPhone App</div>
                    <div className="text-xs text-muted-foreground">Mobile • New York, USA</div>
                    <div className="text-xs text-muted-foreground">Last active 3 hours ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">Revoke</Button>
              </div>
            </div>
            
            <Button variant="outline" className="mt-4">
              <Shield className="mr-2 h-4 w-4" />
              Revoke All Other Sessions
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Security Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}