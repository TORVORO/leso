"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from '@/components/upload/file-uploader';
import { RecentUploads } from '@/components/upload/recent-uploads';
import { UploadQueue } from '@/components/upload/upload-queue';
import { UploadInfoSection } from '@/components/upload/upload-info-section';
import { ArrowRight, Check, FileQuestion } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UploadPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const [recentUploads, setRecentUploads] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return;
    
    // Add files to queue
    const newQueue = [...files].map(file => file.name);
    setUploadQueue([...uploadQueue, ...newQueue]);
    
    // Simulate upload process
    setIsUploading(true);
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(0);
        
        // Move from queue to recent uploads
        setRecentUploads([...newQueue, ...recentUploads]);
        setUploadQueue([]);
        
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${newQueue.length} file${newQueue.length > 1 ? 's' : ''}`,
          duration: 5000,
        });
      }
    }, 200);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Upload Documents</h2>
          <p className="text-muted-foreground">Upload lease documents for processing and analysis</p>
        </div>
        <Button>
          View Processing History <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-[300px]">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Files</CardTitle>
                  <CardDescription>
                    Drag and drop lease documents or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader onFilesSelected={handleFiles} isUploading={isUploading} />
                  
                  {isUploading && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {uploadQueue.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Queue</CardTitle>
                    <CardDescription>
                      Files waiting to be processed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UploadQueue files={uploadQueue} />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                  <CardDescription>
                    Documents that have been uploaded and processed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentUploads.length > 0 ? (
                    <RecentUploads files={recentUploads} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <FileQuestion className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">No recent uploads</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        When you upload documents, they will appear here
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab('upload')}>
                        Upload Documents
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <UploadInfoSection />
          
          <Card>
            <CardHeader>
              <CardTitle>Upload Tips</CardTitle>
              <CardDescription>For best results</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                  <span className="text-sm">Upload original PDF files when possible</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                  <span className="text-sm">Ensure all pages are included and legible</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                  <span className="text-sm">Include amendments and schedules</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                  <span className="text-sm">Name files descriptively (e.g., "Office-NY-2023.pdf")</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}