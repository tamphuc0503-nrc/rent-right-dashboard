
import { orders } from '@/data/orders';
import { format, sub } from 'date-fns';

export type TimeframeType = '1week' | '2weeks' | '3weeks' | '1month' | 'custom';

// Income calculation helper
export const calculateIncome = (days: number) => {
  const today = new Date();
  const startDate = sub(today, { days });
  
  return orders
    .filter(order => order.status === 'completed')
    .reduce((total, order) => total + parseFloat(order.cost.replace('$', '')), 0);
};

// Generate data for the chart based on selected timeframe
export const generateChartData = (timeframe: TimeframeType, dateRange: { from?: Date; to?: Date } | undefined) => {
  if (timeframe === 'custom' && (!dateRange?.from || !dateRange?.to)) {
    return [];
  }
  
  const days = timeframe === '1week' ? 7 : 
              timeframe === '2weeks' ? 14 : 
              timeframe === '3weeks' ? 21 : 
              timeframe === '1month' ? 30 : 
              Math.ceil((dateRange?.to!.getTime() - dateRange?.from!.getTime()) / (1000 * 60 * 60 * 24));

  return Array.from({ length: days }).map((_, i) => {
    const date = sub(new Date(), { days: days - i - 1 });
    return {
      date: format(date, 'MM/dd'),
      income: Math.floor(Math.random() * 500) + 200, // Sample data
    };
  });
};

export const getCompletedOrdersCount = () => {
  return orders.filter(o => o.status === 'completed').length;
};
