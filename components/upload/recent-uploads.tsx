"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { File, CheckCircle, FileText, Download, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface RecentUploadsProps {
  files: string[];
}

interface ProcessedFile {
  name: string;
  status: 'successful' | 'partial' | 'failed';
  uploadDate: Date;
  size: string;
}

export function RecentUploads({ files }: RecentUploadsProps) {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);

  useEffect(() => {
    // Convert incoming filenames to processed files with random metadata
    const newFiles = files.map(filename => {
      // Generate random file size between 1-30MB
      const sizeInMb = (Math.random() * 29 + 1).toFixed(1);
      
      // Randomly assign a status with higher chance of success
      const statusOptions: ProcessedFile['status'][] = ['successful', 'partial', 'failed'];
      const weights = [0.8, 0.15, 0.05]; // 80% successful, 15% partial, 5% failed
      const randomValue = Math.random();
      let statusIndex = 0;
      let cumulativeWeight = weights[0];
      
      while (randomValue > cumulativeWeight && statusIndex < weights.length - 1) {
        statusIndex++;
        cumulativeWeight += weights[statusIndex];
      }
      
      return {
        name: filename,
        status: statusOptions[statusIndex],
        uploadDate: new Date(),
        size: `${sizeInMb} MB`,
      };
    });
    
    setProcessedFiles(prev => [...newFiles, ...prev]);
  }, [files]);

  const handleDelete = (fileName: string) => {
    setProcessedFiles(prev => prev.filter(file => file.name !== fileName));
  };

  if (processedFiles.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No recent uploads</div>;
  }

  return (
    <div className="space-y-3">
      {processedFiles.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <File className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate max-w-[200px]">{file.name}</span>
                <div className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px]",
                  file.status === 'successful' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" :
                  file.status === 'partial' ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                )}>
                  {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{format(file.uploadDate, 'MMM d, yyyy')}</span>
                <span className="mx-1">•</span>
                <span>{file.size}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => handleDelete(file.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}