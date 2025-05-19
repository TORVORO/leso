"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  FileIcon, 
  FileTextIcon, 
  ImageIcon, 
  Download, 
  MoreVertical, 
  Pencil, 
  Trash, 
  Upload, 
  FilePlus2, 
  Eye, 
  Copy 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Document {
  name: string;
  date: string;
  type: 'primary' | 'amendment' | 'supporting';
}

interface LeaseDocumentsProps {
  documents: Document[];
}

export function LeaseDocuments({ documents }: LeaseDocumentsProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // Function to get the appropriate icon based on file name
  const getFileIcon = (fileName: string) => {
    if (fileName.includes('Amendment')) {
      return <FileTextIcon className="h-8 w-8 text-amber-500" />;
    } else if (fileName.includes('Plan')) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    } else {
      return <FileIcon className="h-8 w-8 text-primary" />;
    }
  };
  
  // Function to get the badge variant based on document type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'primary':
        return "bg-primary/10 text-primary border-primary/20";
      case 'amendment':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case 'supporting':
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">Lease Documents</h3>
          <div className="text-sm text-muted-foreground">Manage all lease-related documents</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none border-0 h-8",
                view === 'grid' ? "bg-muted" : "bg-transparent"
              )}
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none border-0 h-8",
                view === 'list' ? "bg-muted" : "bg-transparent"
              )}
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
      
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 space-y-4 hover:border-primary/50 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarFallback className="rounded-md bg-primary/10">
                      {getFileIcon(doc.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{doc.name}</div>
                    <div className="text-xs text-muted-foreground">Added on {doc.date}</div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={cn("capitalize", getBadgeVariant(doc.type))}
                >
                  {doc.type}
                </Badge>
                <div className="text-xs text-muted-foreground">PDF • 2.4 MB</div>
              </div>
            </div>
          ))}
          
          <div className="border rounded-lg p-4 flex flex-col items-center justify-center h-[150px] border-dashed hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <FilePlus2 className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm font-medium">Add Document</span>
            <span className="text-xs text-muted-foreground">Upload or create new</span>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {documents.map((doc, index) => (
            <div 
              key={index} 
              className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-md">
                  <AvatarFallback className="rounded-md bg-primary/10">
                    {getFileIcon(doc.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{doc.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>PDF • 2.4 MB</span>
                    <span className="mx-1">•</span>
                    <span>Added on {doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn("capitalize", getBadgeVariant(doc.type))}
                >
                  {doc.type}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          
          <div className="p-4 flex items-center justify-center hover:bg-muted/20 transition-colors">
            <Button variant="outline" className="w-full gap-1">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}