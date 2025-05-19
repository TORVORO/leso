"use client";

import { AlertCircle, BookOpen, HelpCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function UploadInfoSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Processing</CardTitle>
        <CardDescription>How your uploads are processed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Processing Time</AlertTitle>
          <AlertDescription>
            Large documents may take up to 5 minutes to process
          </AlertDescription>
        </Alert>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="process">
            <AccordionTrigger className="text-sm">The Process</AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">1</div>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">Upload</p>
                    <p className="text-xs text-muted-foreground">Document is securely uploaded</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">2</div>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">OCR Processing</p>
                    <p className="text-xs text-muted-foreground">Text is extracted from document</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">3</div>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">Data Extraction</p>
                    <p className="text-xs text-muted-foreground">Key lease terms are identified</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">4</div>
                  <div className="space-y-1">
                    <p className="font-medium leading-none">Verification</p>
                    <p className="text-xs text-muted-foreground">Review extracted data for accuracy</p>
                  </div>
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="allowed">
            <AccordionTrigger className="text-sm">Supported File Types</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  PDF documents
                </li>
                <li className="flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  Scanned lease agreements
                </li>
                <li className="flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  Amendments and schedules
                </li>
                <li className="flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  Max file size: 30MB
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="help">
            <AccordionTrigger className="text-sm">Need Help?</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 mt-0.5" />
                  <span>Contact support@leasesync.com for assistance</span>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-0.5" />
                  <span>Visit our knowledge base for detailed guides</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}