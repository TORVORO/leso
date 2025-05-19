"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, FileText, Upload, CheckCircle2, AlertTriangle, FileEdit } from 'lucide-react';

// Sample data
const activityItems = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: '',
      initials: 'SJ',
    },
    action: 'uploaded',
    target: 'Corporate HQ Lease Amendment',
    timestamp: '10 minutes ago',
    actionType: 'upload',
  },
  {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: '',
      initials: 'MC',
    },
    action: 'approved',
    target: 'Warehouse Lease Renewal',
    timestamp: '2 hours ago',
    actionType: 'approve',
  },
  {
    id: 3,
    user: {
      name: 'Alex Rodriguez',
      avatar: '',
      initials: 'AR',
    },
    action: 'commented on',
    target: 'Miami Office Space Amendment',
    timestamp: '5 hours ago',
    actionType: 'comment',
  },
  {
    id: 4,
    user: {
      name: 'Emily Davis',
      avatar: '',
      initials: 'ED',
    },
    action: 'flagged issue with',
    target: 'Dallas Retail Lease',
    timestamp: '1 day ago',
    actionType: 'flag',
  },
  {
    id: 5,
    user: {
      name: 'James Wilson',
      avatar: '',
      initials: 'JW',
    },
    action: 'updated',
    target: 'Equipment Lease Agreement',
    timestamp: '2 days ago',
    actionType: 'update',
  },
];

export function LeaseActivityFeed() {
  return (
    <div className="space-y-6">
      {activityItems.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={item.user.avatar} />
            <AvatarFallback className="bg-primary/10">{item.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.user.name}</span>
              <span className="text-muted-foreground text-sm">{item.action}</span>
              <span className="font-medium">{item.target}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ActionIcon type={item.actionType} />
              <span className="ml-1">{item.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActionIcon({ type }: { type: string }) {
  switch (type) {
    case 'upload':
      return <Upload className="h-3 w-3" />;
    case 'approve':
      return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
    case 'flag':
      return <AlertTriangle className="h-3 w-3 text-amber-500" />;
    case 'comment':
      return <FileText className="h-3 w-3" />;
    case 'update':
      return <FileEdit className="h-3 w-3" />;
    default:
      return <Calendar className="h-3 w-3" />;
  }
}