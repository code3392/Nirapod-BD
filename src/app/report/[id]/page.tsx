'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ReportDetail from '@/components/report/ReportDetail';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params?.id as string;
  const { getReportById, language } = useApp();

  const report = getReportById(reportId);

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-navy">
          {language === 'en' ? 'Report Not Found' : 'রিপোর্টটি পাওয়া যায়নি'}
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {language === 'en'
            ? `We couldn't locate incident with ID "${reportId}". It may have been archived or removed.`
            : `আইডি "${reportId}" সম্বলিত রিপোর্টটি খুঁজে পাওয়া যায়নি।`}
        </p>
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow transition hover:bg-navy-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Return to Reports' : 'সকল রিপোর্টে ফিরে যান'}</span>
        </Link>
      </div>
    );
  }

  return <ReportDetail report={report} />;
}
