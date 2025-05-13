
import React, { useState } from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { orders } from '@/data/orders';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, sub, startOfDay, endOfDay } from 'date-fns';

const IncomeReport = () => {
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: sub(new Date(), { days: 7 }),
    to: new Date(),
  });
  
  const [timeframe, setTimeframe] = useState<'1week' | '2weeks' | '3weeks' | '1month' | 'custom'>('1week');
  
  // Income calculation helper
  const calculateIncome = (days: number) => {
    const today = new Date();
    const startDate = startOfDay(sub(today, { days }));
    const endDate = endOfDay(today);
    
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + parseFloat(order.cost.replace('$', '')), 0);
  };

  // Set date range based on timeframe
  const handleTimeframeChange = (newTimeframe: typeof timeframe) => {
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
  
  // Generate data for the chart based on selected timeframe
  const generateChartData = () => {
    if (timeframe === 'custom' && (!dateRange.from || !dateRange.to)) {
      return [];
    }
    
    const days = timeframe === '1week' ? 7 : 
                timeframe === '2weeks' ? 14 : 
                timeframe === '3weeks' ? 21 : 
                timeframe === '1month' ? 30 : 
                Math.ceil((dateRange.to!.getTime() - dateRange.from!.getTime()) / (1000 * 60 * 60 * 24));

    return Array.from({ length: days }).map((_, i) => {
      const date = sub(new Date(), { days: days - i - 1 });
      return {
        date: format(date, 'MM/dd'),
        income: Math.floor(Math.random() * 500) + 200, // Sample data
      };
    });
  };
  
  const chartData = generateChartData();
  
  // Calculate totals
  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
  const averageIncome = chartData.length > 0 ? totalIncome / chartData.length : 0;

  const chartConfig = {
    income: { color: "#10b981", label: "Income ($)" },
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Income Report</h1>
      
      <div className="grid gap-6 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-3xl">${totalIncome.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">For selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Daily</CardDescription>
            <CardTitle className="text-3xl">${Math.round(averageIncome).toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Per day in period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Orders</CardDescription>
            <CardTitle className="text-3xl">{orders.filter(o => o.status === 'completed').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Order Value</CardDescription>
            <CardTitle className="text-3xl">$289</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Per completed order</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={timeframe === '1week' ? 'default' : 'outline'} 
            onClick={() => handleTimeframeChange('1week')}
          >
            1 Week
          </Button>
          <Button 
            variant={timeframe === '2weeks' ? 'default' : 'outline'} 
            onClick={() => handleTimeframeChange('2weeks')}
          >
            2 Weeks
          </Button>
          <Button 
            variant={timeframe === '3weeks' ? 'default' : 'outline'} 
            onClick={() => handleTimeframeChange('3weeks')}
          >
            3 Weeks
          </Button>
          <Button 
            variant={timeframe === '1month' ? 'default' : 'outline'} 
            onClick={() => handleTimeframeChange('1month')}
          >
            1 Month
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={timeframe === 'custom' ? 'default' : 'outline'} 
                onClick={() => setTimeframe('custom')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span>
                  {dateRange.from && dateRange.to ? (
                    <>
                      {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
                    </>
                  ) : (
                    "Custom Range"
                  )}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range || {});
                  if (range?.from && range?.to) {
                    setTimeframe('custom');
                  }
                }}
                numberOfMonths={2}
                defaultMonth={dateRange.from}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="h-[400px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default IncomeReport;
