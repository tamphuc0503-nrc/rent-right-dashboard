
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

interface IncomeChartProps {
  chartData: Array<{ date: string; income: number; }>;
}

const IncomeChart: React.FC<IncomeChartProps> = ({ chartData }) => {
  const chartConfig = {
    income: { color: "#10b981", label: "Income ($)" },
  };

  return (
    <div className="h-[400px]">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
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
  );
};

export default IncomeChart;
