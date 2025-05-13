
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

interface IncomeReportHeaderProps {
  totalIncome: number;
  averageIncome: number;
  completedOrders: number;
}

const IncomeReportHeader: React.FC<IncomeReportHeaderProps> = ({
  totalIncome,
  averageIncome,
  completedOrders
}) => {
  return (
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
          <CardTitle className="text-3xl">{completedOrders}</CardTitle>
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
  );
};

export default IncomeReportHeader;
