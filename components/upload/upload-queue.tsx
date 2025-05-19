"use client";

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2, File, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadQueueProps {
  files: string[];
}

export function UploadQueue({ files }: UploadQueueProps) {
  const [processedFiles, setProcessedFiles] = useState<Record<string, { status: string; progress: number }>>({});

  useEffect(() => {
    // Initialize new files with pending status
    const newProcessedFiles = { ...processedFiles };
    
    files.forEach(fileName => {
      if (!newProcessedFiles[fileName]) {
        newProcessedFiles[fileName] = { status: 'pending', progress: 0 };
      }
    });
    
    setProcessedFiles(newProcessedFiles);
    
    // Simulate processing of files
    const processFiles = async () => {
      for (const fileName of files) {
        if (processedFiles[fileName]?.status === 'completed') continue;
        
        // Update status to processing
        setProcessedFiles(prev => ({
          ...prev,
          [fileName]: { ...prev[fileName], status: 'processing' }
        }));
        
        // Simulate progress updates
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          setProcessedFiles(prev => ({
            ...prev,
            [fileName]: { ...prev[fileName], progress }
          }));
        }
        
        // Mark as completed
        setProcessedFiles(prev => ({
          ...prev,
          [fileName]: { status: 'completed', progress: 100 }
        }));
        
        // Small delay between files
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };
    
    processFiles();
  }, [files]);

  if (files.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No files in queue</div>;
  }

  return (
    <div className="space-y-3">
      {files.map((fileName, index) => {
        const fileStatus = processedFiles[fileName] || { status: 'pending', progress: 0 };
        
        return (
          <div
            key={`${fileName}-${index}`}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              fileStatus.status === 'completed' ? "bg-muted/30" : "bg-background"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <File className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="font-medium text-sm truncate max-w-[200px]">{fileName}</div>
                <div className="flex items-center">
                  {fileStatus.status === 'processing' && (
                    <Loader2 className="h-3 w-3 mr-1 animate-spin text-primary" />
                  )}
                  {fileStatus.status === 'completed' && (
                    <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {fileStatus.status === 'pending' && 'Waiting to process...'}
                    {fileStatus.status === 'processing' && 'Processing...'}
                    {fileStatus.status === 'completed' && 'Processed successfully'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-20">
              <Progress value={fileStatus.progress} className="h-1.5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}