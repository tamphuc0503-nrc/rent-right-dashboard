
import React, { useState } from 'react';
import { BarChart3, Filter } from 'lucide-react';
import { agents } from '@/data/agents';
import { orders } from '@/data/orders';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const InspectionReport = () => {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState('month');

  // Calculate inspection counts per agent
  const inspectionData = agents.map(agent => {
    const agentOrders = orders.filter(order => order.agentId === agent.id);
    return {
      name: agent.name,
      inspections: agentOrders.length,
      completed: agentOrders.filter(order => order.status === 'completed').length,
      pending: agentOrders.filter(order => order.status === 'pending').length,
      scheduled: agentOrders.filter(order => order.status === 'scheduled').length,
    };
  });

  const toggleAgentSelection = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const filteredData = selectedAgents.length > 0
    ? inspectionData.filter(d => selectedAgents.includes(d.name))
    : inspectionData;

  const chartConfig = {
    inspections: { color: "#2563eb", label: "Total Inspections" },
    completed: { color: "#10b981", label: "Completed" },
    pending: { color: "#f59e0b", label: "Pending" },
    scheduled: { color: "#6366f1", label: "Scheduled" },
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Inspection Report</h1>
      
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Filters</h2>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Time Period</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Inspectors</label>
            <div className="space-y-2">
              {agents.map(agent => (
                <div 
                  key={agent.id} 
                  className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                    selectedAgents.includes(agent.name) ? 'bg-primary/10' : 'hover:bg-accent'
                  }`}
                  onClick={() => toggleAgentSelection(agent.name)}
                >
                  <span>{agent.name}</span>
                  <Badge variant={selectedAgents.includes(agent.name) ? "default" : "outline"}>
                    {orders.filter(order => order.agentId === agent.id).length}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Inspection Data</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Based on {timeframe === 'month' ? '30' : timeframe === 'week' ? '7' : timeframe === 'quarter' ? '90' : '365'} days data</span>
              <button className="p-2 rounded-md hover:bg-accent">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mb-2 opacity-30" />
              <p>Select inspectors to view data</p>
            </div>
          ) : (
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                    <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                    <Bar dataKey="scheduled" stackId="a" fill="#6366f1" name="Scheduled" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InspectionReport;
