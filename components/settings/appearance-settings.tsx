"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Palette, PencilIcon, SunIcon, MoonIcon, MonitorIcon, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState('medium');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  
  const handleSave = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your visual preferences have been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>Customize your visual experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">Theme Mode</Label>
              <div className="grid grid-cols-3 gap-4">
                <div 
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer",
                    theme === 'light' ? "border-primary" : "border-transparent hover:border-muted"
                  )}
                  onClick={() => setTheme('light')}
                >
                  <div className="h-20 w-full rounded-md bg-white border dark:border-gray-800 flex items-center justify-center">
                    <SunIcon className="h-6 w-6 text-amber-500" />
                  </div>
                  <span className="text-sm font-medium">Light</span>
                </div>
                
                <div 
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer",
                    theme === 'dark' ? "border-primary" : "border-transparent hover:border-muted"
                  )}
                  onClick={() => setTheme('dark')}
                >
                  <div className="h-20 w-full rounded-md bg-gray-900 border dark:border-gray-800 flex items-center justify-center">
                    <MoonIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">Dark</span>
                </div>
                
                <div 
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer",
                    theme === 'system' ? "border-primary" : "border-transparent hover:border-muted"
                  )}
                  onClick={() => setTheme('system')}
                >
                  <div className="h-20 w-full rounded-md bg-gradient-to-r from-white to-gray-900 border dark:border-gray-800 flex items-center justify-center">
                    <MonitorIcon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">System</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label className="text-base">Accessibility</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">UI animations</Label>
                    <div className="text-sm text-muted-foreground">
                      Toggle animations throughout the interface
                    </div>
                  </div>
                  <Switch 
                    id="animations" 
                    checked={animationsEnabled} 
                    onCheckedChange={setAnimationsEnabled} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font size</Label>
                  <RadioGroup
                    id="font-size"
                    defaultValue={fontSize}
                    className="grid grid-cols-3 gap-4"
                    onValueChange={setFontSize}
                  >
                    <div>
                      <RadioGroupItem
                        value="small"
                        id="font-small"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="font-small"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-xs">Small</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="font-medium"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="font-medium"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-sm">Medium</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="large"
                        id="font-large"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="font-large"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-base">Large</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion">Reduced motion</Label>
                    <div className="text-sm text-muted-foreground">
                      Minimize animations for accessibility
                    </div>
                  </div>
                  <Switch id="reduced-motion" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High contrast</Label>
                    <div className="text-sm text-muted-foreground">
                      Increase contrast for better readability
                    </div>
                  </div>
                  <Switch id="high-contrast" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Theme Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Layout</CardTitle>
          <CardDescription>Customize your dashboard experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="layout-preference">Default dashboard layout</Label>
            <RadioGroup
              id="layout-preference"
              defaultValue={dashboardLayout}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onValueChange={setDashboardLayout}
            >
              <div>
                <RadioGroupItem
                  value="default"
                  id="layout-default"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="layout-default"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full h-24 bg-muted/50 rounded-md border flex flex-col gap-1 p-1">
                    <div className="h-1/3 bg-muted rounded w-full"></div>
                    <div className="flex gap-1 h-2/3">
                      <div className="w-1/2 bg-muted rounded"></div>
                      <div className="w-1/2 bg-muted rounded"></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium mt-2">Default</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="compact"
                  id="layout-compact"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="layout-compact"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full h-24 bg-muted/50 rounded-md border flex flex-col gap-1 p-1">
                    <div className="h-1/4 bg-muted rounded w-full"></div>
                    <div className="flex gap-1 h-3/4">
                      <div className="w-2/3 bg-muted rounded"></div>
                      <div className="w-1/3 space-y-1">
                        <div className="h-1/2 bg-muted rounded"></div>
                        <div className="h-1/2 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium mt-2">Compact</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="custom"
                  id="layout-custom"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="layout-custom"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full h-24 bg-muted/50 rounded-md border flex items-center justify-center">
                    <PencilIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium mt-2">Custom</span>
                  <Badge className="text-[10px] py-0 h-4 mt-1">New</Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-base">Widget Preferences</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show summary cards</Label>
                  <div className="text-sm text-muted-foreground">
                    Display key metrics at the top of the dashboard
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show recent activity</Label>
                  <div className="text-sm text-muted-foreground">
                    Display recent lease activity on the dashboard
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show data visualizations</Label>
                  <div className="text-sm text-muted-foreground">
                    Display charts and graphs on the dashboard
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable widget reordering</Label>
                  <div className="text-sm text-muted-foreground">
                    Allow dragging and dropping widgets to customize layout
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Layout Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}