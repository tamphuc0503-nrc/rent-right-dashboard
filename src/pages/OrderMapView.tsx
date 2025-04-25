import { useEffect, useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import MapOrderDayGroup from "@/components/orders/MapOrderDayGroup";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState as useReactState } from "react";

const BASE_DATE = new Date(2024, 3, 26); // April 26, 2024

const generateDummyOrders = (startDate: Date, profileName: string) => {
  const orders = [];
  const usedTimesPerDay: {[iso: string]: Set<string>} = {};

  function getFreeTime(date: Date) {
    const iso = date.toISOString().slice(0, 10);
    if (!usedTimesPerDay[iso]) usedTimesPerDay[iso] = new Set();
    let hour = 8;
    while (hour <= 19 && usedTimesPerDay[iso].has(`${hour}:00`)) hour++;
    if (hour > 19) hour = 8 + Math.floor(Math.random()*5);
    usedTimesPerDay[iso].add(`${hour}:00`);
    return `${hour}:00`;
  }

  for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
    const date = addDays(BASE_DATE, dayOffset);
    for (let j = 0; j < 3; j++) {
      orders.push({
        id: `s${dayOffset}-${j}`,
        date: new Date(date),
        address: `${400 + j} Sunrise Ave`,
        client: `Client Special ${dayOffset + 1}-${j + 1}`,
        type: j % 2 ? "Home Inspection" : "Property Assessment",
        time: getFreeTime(date),
        coordinates: [-122.42 + (Math.random() - 0.5) * 0.1, 37.77 + (Math.random() - 0.5) * 0.1],
      });
    }
  }

  orders.push({
    id: "dummy-user-order",
    date: new Date(BASE_DATE),
    address: "",
    client: profileName,
    type: "My Profile Inspection",
    time: "8:00",
    dummy: true,
    coordinates: [-122.45, 37.78]
  });

  for (let i = 3; i < 9; i++) {
    const date = addDays(startDate, i);
    const numOrders = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numOrders; j++) {
      orders.push({
        id: `${i}-${j}`,
        date: new Date(date),
        address: `${Math.floor(Math.random() * 1000)} Main St`,
        client: `Client ${i}-${j}`,
        type: ['Home Inspection', 'Property Assessment', 'Safety Check'][Math.floor(Math.random() * 3)],
        time: getFreeTime(date),
        coordinates: [
          -122.4194 + (Math.random() - 0.5) * 0.2,
          37.7749 + (Math.random() - 0.5) * 0.2
        ],
      });
    }
  }

  return orders;
};

const WEEK_TAGS = [
  { value: 7, label: '1w' },
  { value: 14, label: '2w' },
  { value: 21, label: '3w' },
  { value: 28, label: '4w' }
];

const MOCK_PROFILE_NAME = "Jane Doe";

const OrderMapView = () => {
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState<Date>(BASE_DATE);
  const [weekRange, setWeekRange] = useState(7);
  const [reviewOrder, setReviewOrder] = useReactState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedDate, weekRange]);

  const orders = generateDummyOrders(BASE_DATE, MOCK_PROFILE_NAME);

  const dates = [];
  for (let i = 0; i < weekRange; i++) {
    const date = addDays(selectedDate, i);
    dates.push(date);
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar isMobile={isMobile} />
        <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'} transition-all duration-300`}>
          <DashboardHeader />
          <main className="p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Map of Upcoming Orders</h1>
              <div className="flex items-center gap-2">
                {WEEK_TAGS.map(w =>
                  <Button
                    key={w.value}
                    size="sm"
                    variant={weekRange === w.value ? "default" : "outline"}
                    className="px-3 py-1"
                    onClick={() => setWeekRange(w.value)}
                  >
                    {w.label}
                  </Button>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {format(selectedDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              {loading ? (
                Array.from({ length: 7 }).map((_, idx) => (
                  <div key={idx} className="mb-6 border rounded-lg shadow-sm overflow-hidden bg-white animate-pulse">
                    <div className="flex items-center px-4 py-2 bg-gray-50">
                      <Skeleton className="h-4 w-4 rounded-full mr-2" />
                      <div className="font-semibold text-gray-400 h-5 w-60 bg-gray-100 rounded"></div>
                      <span className="ml-3 inline-block text-xs rounded-full bg-blue-100 text-blue-700 px-2 py-1 w-16"></span>
                      <span className="ml-auto text-gray-300 w-6 h-4 bg-gray-100 rounded" />
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="h-44 bg-gray-100 flex-1" />
                      <div className="flex-1 p-4">
                        {[...Array(2)].map((_,i) => (
                          <div key={i} className="h-8 w-full bg-gray-100 rounded mb-2"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                dates.map((date) => {
                  const dateOrders = orders.filter(order => isSameDay(order.date, date));
                  if (!dateOrders.length) return null;
                  return (
                    <MapOrderDayGroup
                      key={date.toISOString()}
                      day={date}
                      count={dateOrders.length}
                    >
                      {{
                        map: (
                          <div className="mb-4 bg-gray-100 rounded h-44 flex items-center justify-center">
                            <MapPin className="h-10 w-10 text-blue-400" />
                            <span className="ml-2 text-gray-700">
                              Map Preview: {dateOrders.length} order(s)
                            </span>
                          </div>
                        ),
                        orders: (
                          <ul>
                            {dateOrders.map(order => (
                              <li
                                key={order.id}
                                className={`
                                  mb-2 flex items-center gap-4 group bg-opacity-90 rounded-lg px-2 transition-all
                                  ${order.dummy
                                    ? "border border-dashed border-blue-400 bg-blue-50"
                                    : "hover:bg-blue-50"}
                                `}
                                style={{ minHeight: 48 }}
                              >
                                <span className={`inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 w-8 h-8 mr-2`}>
                                  <MapPin className="h-4 w-4" />
                                </span>
                                <span className="font-semibold">
                                  {order.dummy ? "" : order.address}
                                  {order.dummy && <span>(Dummy with profile name)</span>}
                                </span>
                                <span className="text-gray-500 text-sm">{order.client}</span>
                                <span className="ml-2 text-xs text-gray-700">{order.time}</span>
                                <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">{order.type}</span>
                                <span className="flex gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                  <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="border border-gray-300 hover:bg-black/90 hover:text-white tooltip-black"
                                        onClick={() => setReviewOrder(order)}
                                        aria-label="Popup review"
                                      >
                                        <span className="sr-only">Review</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8.1 13.34a4 4 0 1 1 7.81 0M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="tooltip-black">Review (popup)</TooltipContent>
                                  </Tooltip>
                                  <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="border border-gray-300 hover:bg-black/90 hover:text-white tooltip-black"
                                        onClick={() => window.open(`/orders/${order.id}`, "_blank", "noopener")}
                                        aria-label="Open in new tab"
                                      >
                                        <span className="sr-only">Open order</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3" /></svg>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="tooltip-black">Open (new tab)</TooltipContent>
                                  </Tooltip>
                                </span>
                              </li>
                            ))}
                          </ul>
                        )
                      }}
                    </MapOrderDayGroup>
                  );
                })
              )}
            </div>
            {reviewOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setReviewOrder(null)}>
                <div className="bg-white rounded-xl p-6 shadow-lg min-w-[320px] max-w-[90vw]" onClick={e => e.stopPropagation()}>
                  <h2 className="font-semibold text-lg mb-2">Order Review</h2>
                  <div className="mb-2">{reviewOrder.address || "(No address - dummy)"}</div>
                  <div>Client:&nbsp;<b>{reviewOrder.client}</b></div>
                  <div>Type: {reviewOrder.type}</div>
                  <div>Time: {reviewOrder.time}</div>
                  <Button variant="default" className="mt-4" onClick={() => setReviewOrder(null)}>Close</Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default OrderMapView;
