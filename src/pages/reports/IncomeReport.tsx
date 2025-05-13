
import React, { useState } from 'react';
import { sub } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { orders } from '@/data/orders';
import IncomeReportHeader from './components/IncomeReportHeader';
import TimeframeSelector from './components/TimeframeSelector';
import IncomeChart from './components/IncomeChart';
import { calculateIncome, generateChartData, getCompletedOrdersCount, TimeframeType } from './utils/incomeUtils';

const IncomeReport = () => {
  // Updated to use the correct DateRange type
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: sub(new Date(), { days: 7 }),
    to: new Date(),
  });
  
  const [timeframe, setTimeframe] = useState<TimeframeType>('1week');
  
  // Set date range based on timeframe
  const handleTimeframeChange = (newTimeframe: TimeframeType) => {
    setTimeframe(newTimeframe);
    
    if (newTimeframe !== 'custom') {
      const days = newTimeframe === '1week' ? 7 : 
                  newTimeframe === '2weeks' ? 14 : 
                  newTimeframe === '3weeks' ? 21 : 30;
      
      setDateRange({
        from: sub(new Date(), { days }),
        to: new Date(),
      });
    }
  };
  
  // Generate chart data
  const chartData = generateChartData(timeframe, dateRange);
  
  // Calculate totals
  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
  const averageIncome = chartData.length > 0 ? totalIncome / chartData.length : 0;
  const completedOrders = getCompletedOrdersCount();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Income Report</h1>
      
      <IncomeReportHeader 
        totalIncome={totalIncome}
        averageIncome={averageIncome}
        completedOrders={completedOrders}
      />
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <TimeframeSelector 
          timeframe={timeframe}
          dateRange={dateRange}
          onTimeframeChange={handleTimeframeChange}
          setDateRange={setDateRange}
        />
        
        <IncomeChart chartData={chartData} />
      </div>
    </>
  );
};

export default IncomeReport;
