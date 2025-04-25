
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import CalendarToolbar from '@/components/scheduling/CalendarToolbar';
import CalendarViews from '@/components/scheduling/CalendarViews';

const SchedulingCalendar = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState('month');

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
        <DashboardHeader />
        <main className="p-6">
          <CalendarToolbar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            view={view}
            setView={setView}
          />
          <CalendarViews
            view={view}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </main>
      </div>
    </div>
  );
};

export default SchedulingCalendar;
