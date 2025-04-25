
import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import ViewMessageModal from "@/components/ViewMessageModal";
import { TooltipProvider } from "@/components/ui/tooltip";

import type { Message } from "@/components/messages/types";
import MessagesTable from "@/components/messages/MessagesTable";
import MessagesMobileCards from "@/components/messages/MessagesMobileCards";

const DUMMY_MESSAGES: Message[] = [
  {
    id: "m1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-1011",
    sentDate: "2024-04-10",
    content: "Hello! This is a message about order ORD-10005.",
    messageType: "Order Update",
    templateName: "Order Status",
  },
  {
    id: "m2",
    name: "Bob Lee",
    email: "bob@example.com",
    phone: "555-7321",
    sentDate: "2024-04-12",
    content: "Your inspection report is ready! Please check your email.",
    messageType: "Inspection Report",
    templateName: "Report Ready",
  },
  {
    id: "m3",
    name: "Sarah Kim",
    email: "sarah@example.com",
    phone: "555-4423",
    sentDate: "2024-04-13",
    content: "Reminder: Your inspection is scheduled for 2024-04-15.",
    messageType: "Reminder",
    templateName: "Schedule Reminder",
  },
  {
    id: "m4",
    name: "David Nguyen",
    email: "david@example.com",
    phone: "555-7010",
    sentDate: "2024-04-14",
    content: "We noticed you haven't completed your profile.",
    messageType: "Profile",
    templateName: "Profile Incomplete",
  },
  {
    id: "m5",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "555-7799",
    sentDate: "2024-04-14",
    content: "Payment confirmation for order ORD-10043.",
    messageType: "Payment",
    templateName: "Payment Confirmation",
  },
  {
    id: "m6",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-6532",
    sentDate: "2024-04-15",
    content: "Order has been archived as completed.",
    messageType: "Order Archive",
    templateName: "Archive Confirmation",
  },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function Messages() {
  const isMobile = useIsMobile();
  const [skeleton, setSkeleton] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [viewMessage, setViewMessage] = useState<Message | null>(null);

  useEffect(() => {
    setSkeleton(true);
    delay(2000).then(() => setSkeleton(false));
  }, []);

  const filteredMessages = useMemo(() => {
    let filtered = DUMMY_MESSAGES;
    if (search.trim()) {
      filtered = filtered.filter(m =>
        `${m.name} ${m.email} ${m.phone} ${m.content} ${m.messageType} ${m.templateName}`.toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    if (date) {
      filtered = filtered.filter(m => m.sentDate === date);
    }
    return filtered;
  }, [search, date]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
        <DashboardHeader />
        <main className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">My Messages</h1>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute top-2.5 left-3 text-gray-400 h-4 w-4" />
              </div>
              <div className="flex items-center">
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-40"
                  max={format(new Date(), "yyyy-MM-dd")}
                />
                <CalendarIcon className="ml-2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
          <TooltipProvider>
            {isMobile ? (
              <MessagesMobileCards
                messages={filteredMessages}
                skeleton={skeleton}
                onViewMessage={setViewMessage}
              />
            ) : (
              <MessagesTable
                messages={filteredMessages}
                skeleton={skeleton}
                onViewMessage={setViewMessage}
              />
            )}
          </TooltipProvider>
          {viewMessage && (
            <ViewMessageModal
              message={viewMessage}
              onClose={() => setViewMessage(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
