'use client';

import React from 'react';
import { SeverityLevel } from '@/types';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, AlertCircle, ShieldAlert, Check } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function SeverityBadge({ severity, size = 'md', showIcon = true }: SeverityBadgeProps) {
  const { t } = useApp();

  const getSeverityConfig = () => {
    switch (severity) {
      case 'emergency':
        return {
          label: t.severity.emergency,
          icon: <ShieldAlert className="w-3.5 h-3.5 text-white" />,
          classes: 'bg-emergency text-white border-emergency animate-pulse-subtle font-extrabold shadow-sm',
          indicator: 'bg-white',
        };
      case 'high':
        return {
          label: t.severity.high,
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          classes: 'bg-orange-50 text-orange-700 border-orange-300 font-bold',
          indicator: 'bg-orange-500',
        };
      case 'medium':
        return {
          label: t.severity.medium,
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          classes: 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
          indicator: 'bg-amber-500',
        };
      case 'low':
        return {
          label: t.severity.low,
          icon: <Check className="w-3.5 h-3.5" />,
          classes: 'bg-slate-50 text-slate-700 border-slate-200 font-medium',
          indicator: 'bg-slate-400',
        };
    }
  };

  const config = getSeverityConfig();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border tracking-tight ${config.classes} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.indicator}`} />
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
}
