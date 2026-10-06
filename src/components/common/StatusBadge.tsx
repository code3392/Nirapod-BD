'use client';

import React from 'react';
import { ReportStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Clock, 
  Bot, 
  Search, 
  CheckCircle2, 
  UserCheck, 
  Hammer, 
  CheckCheck, 
  XCircle, 
  Copy, 
  AlertOctagon 
} from 'lucide-react';

interface StatusBadgeProps {
  status: ReportStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
  const { language, t } = useApp();

  const getStatusConfig = () => {
    switch (status) {
      case 'SUBMITTED':
        return {
          label: t.status.SUBMITTED,
          icon: <Clock className="w-3.5 h-3.5" />,
          classes: 'bg-amber-50 text-amber-700 border-amber-200/80',
        };
      case 'AI_ANALYZED':
        return {
          label: t.status.AI_ANALYZED,
          icon: <Bot className="w-3.5 h-3.5" />,
          classes: 'bg-sky-50 text-sky-700 border-sky-200/80',
        };
      case 'UNDER_REVIEW':
        return {
          label: t.status.UNDER_REVIEW,
          icon: <Search className="w-3.5 h-3.5" />,
          classes: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        };
      case 'VERIFIED':
        return {
          label: t.status.VERIFIED,
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />,
          classes: 'bg-blue-50 text-blue-800 border-blue-200 font-bold',
        };
      case 'ASSIGNED':
        return {
          label: t.status.ASSIGNED,
          icon: <UserCheck className="w-3.5 h-3.5" />,
          classes: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        };
      case 'IN_PROGRESS':
        return {
          label: t.status.IN_PROGRESS,
          icon: <Hammer className="w-3.5 h-3.5 animate-spin-slow" />,
          classes: 'bg-blue-50 text-blue-700 border-blue-300 font-bold',
        };
      case 'RESOLVED':
        return {
          label: t.status.RESOLVED,
          icon: <CheckCheck className="w-3.5 h-3.5 text-white" />,
          classes: 'bg-civic-blue text-white border-civic-blue font-extrabold',
        };
      case 'COMMUNITY_CONFIRMED':
        return {
          label: t.status.COMMUNITY_CONFIRMED,
          icon: <CheckCheck className="w-3.5 h-3.5 text-sky-600" />,
          classes: 'bg-sky-50 text-sky-800 border-sky-300 font-extrabold',
        };
      case 'REJECTED':
        return {
          label: t.status.REJECTED,
          icon: <XCircle className="w-3.5 h-3.5" />,
          classes: 'bg-slate-100 text-slate-600 border-slate-300',
        };
      case 'DUPLICATE':
        return {
          label: t.status.DUPLICATE,
          icon: <Copy className="w-3.5 h-3.5" />,
          classes: 'bg-orange-50 text-orange-700 border-orange-200',
        };
      case 'FALSE_REPORT':
        return {
          label: t.status.FALSE_REPORT,
          icon: <AlertOctagon className="w-3.5 h-3.5" />,
          classes: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      default:
        return {
          label: status,
          icon: null,
          classes: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const config = getStatusConfig();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold tracking-tight transition-all shadow-2xs ${config.classes} ${sizeClasses}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
}
