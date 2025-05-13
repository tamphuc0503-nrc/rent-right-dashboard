
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import InspectionReport from './reports/InspectionReport';
import IncomeReport from './reports/IncomeReport';

const Reports = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine which report to show based on path
  const renderReportContent = () => {
    const path = location.pathname;
    
    if (path.includes('/reports/inspection')) {
      return <InspectionReport />;
    } else if (path.includes('/reports/income')) {
      return <IncomeReport />;
    } else {
      // Default to inspection report if no specific report is selected
      return <InspectionReport />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          {renderReportContent()}
        </main>
      </div>
    </div>
  );
};

export default Reports;
