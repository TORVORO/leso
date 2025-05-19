"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  FileEdit, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  DollarSign 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data for lease timeline
const timelineEvents = [
  {
    id: 1,
    date: 'Jun 13, 2024',
    time: '10:32 AM',
    type: 'payment',
    user: {
      name: 'Sarah Johnson',
      avatar: '',
      initials: 'SJ',
    },
    description: 'Recorded payment for June 2024',
    amount: '$42,500',
    receiptId: 'PAY-2024-06',
  },
  {
    id: 2,
    date: 'May 15, 2024',
    time: '9:45 AM',
    type: 'payment',
    user: {
      name: 'Sarah Johnson',
      avatar: '',
      initials: 'SJ',
    },
    description: 'Recorded payment for May 2024',
    amount: '$42,500',
    receiptId: 'PAY-2024-05',
  },
  {
    id: 3,
    date: 'Mar 15, 2024',
    time: '2:18 PM',
    type: 'document',
    user: {
      name: 'Michael Chen',
      avatar: '',
      initials: 'MC',
    },
    description: 'Updated lease agreement documentation',
    documentName: 'First Amendment',
  },
  {
    id: 4,
    date: 'Jan 17, 2024',
    time: '11:03 AM',
    type: 'comment',
    user: {
      name: 'Alex Rodriguez',
      avatar: '',
      initials: 'AR',
    },
    description: 'Added note about building access hours',
    comment: 'New building access hours are 6am-10pm weekdays, 8am-6pm weekends. Security will need advance notice for after-hours access.',
  },
  {
    id: 5,
    date: 'Jan 15, 2024',
    time: '9:30 AM',
    type: 'payment',
    user: {
      name: 'Sarah Johnson',
      avatar: '',
      initials: 'SJ',
    },
    description: 'Recorded payment for January 2024',
    amount: '$42,500',
    receiptId: 'PAY-2024-01',
  },
  {
    id: 6,
    date: 'Dec 12, 2023',
    time: '3:45 PM',
    type: 'email',
    user: {
      name: 'Emily Davis',
      avatar: '',
      initials: 'ED',
    },
    description: 'Sent reminder about upcoming CPI adjustment',
    emailSubject: 'CPI Adjustment Reminder for January 2024',
  },
  {
    id: 7,
    date: 'Dec 01, 2023',
    time: '10:15 AM',
    type: 'issue',
    user: {
      name: 'James Wilson',
      avatar: '',
      initials: 'JW',
    },
    description: 'Reported HVAC issue in north zone',
    isResolved: true,
    resolutionDate: 'Dec 05, 2023',
  },
  {
    id: 8,
    date: 'Jan 15, 2023',
    time: '8:00 AM',
    type: 'created',
    user: {
      name: 'John Smith',
      avatar: '',
      initials: 'JS',
    },
    description: 'Lease activated',
  },
  {
    id: 9,
    date: 'Dec 20, 2022',
    time: '4:30 PM',
    type: 'document',
    user: {
      name: 'John Smith',
      avatar: '',
      initials: 'JS',
    },
    description: 'Created lease record',
    documentName: 'Original Lease Agreement',
  },
];

export function LeaseTimeline() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="font-medium text-lg">Lease History</h3>
        <div className="text-sm text-muted-foreground">Complete activity timeline for this lease</div>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-6 bottom-0 w-px bg-border ml-0.5" />
        
        <div className="space-y-8">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative pl-12">
              {/* Timeline dot */}
              <div className={cn(
                "absolute left-0 top-0 rounded-full p-2 border-2",
                event.type === 'payment' ? "bg-emerald-100 border-emerald-300 dark:bg-emerald-900 dark:border-emerald-700" :
                event.type === 'document' ? "bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700" :
                event.type === 'comment' ? "bg-purple-100 border-purple-300 dark:bg-purple-900 dark:border-purple-700" :
                event.type === 'email' ? "bg-amber-100 border-amber-300 dark:bg-amber-900 dark:border-amber-700" :
                event.type === 'issue' ? "bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700" :
                "bg-gray-100 border-gray-300 dark:bg-gray-900 dark:border-gray-700"
              )}>
                {event.type === 'payment' && <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                {event.type === 'document' && <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                {event.type === 'comment' && <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                {event.type === 'email' && <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                {event.type === 'issue' && <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                {event.type === 'created' && <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
              </div>
              
              {/* Timeline content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={event.user.avatar} />
                      <AvatarFallback>{event.user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{event.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.date} at {event.time}
                      </div>
                    </div>
                  </div>
                  
                  {event.type === 'document' && (
                    <Button variant="outline" size="sm" className="gap-1 h-7">
                      <FileText className="h-3.5 w-3.5" />
                      View
                    </Button>
                  )}
                  
                  {event.type === 'payment' && (
                    <Button variant="outline" size="sm" className="gap-1 h-7">
                      <FileText className="h-3.5 w-3.5" />
                      Receipt
                    </Button>
                  )}
                </div>
                
                <div className="rounded-lg border p-3 bg-card">
                  <div className="text-sm">{event.description}</div>
                  
                  {event.type === 'payment' && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">{event.amount}</span>
                    </div>
                  )}
                  
                  {event.type === 'comment' && event.comment && (
                    <div className="mt-2 text-sm bg-muted p-2 rounded-md italic">
                      "{event.comment}"
                    </div>
                  )}
                  
                  {event.type === 'email' && event.emailSubject && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="font-medium">{event.emailSubject}</span>
                    </div>
                  )}
                  
                  {event.type === 'issue' && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <div className={cn(
                        "px-2 py-0.5 rounded text-xs",
                        event.isResolved 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" 
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                      )}>
                        {event.isResolved ? 'Resolved' : 'Open'}
                      </div>
                      {event.isResolved && event.resolutionDate && (
                        <span className="text-xs text-muted-foreground">
                          Resolved on {event.resolutionDate}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}