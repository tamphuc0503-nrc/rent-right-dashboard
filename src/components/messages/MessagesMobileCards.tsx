
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import MessagesQuickActions from "./MessagesQuickActions";
import type { Message } from "./types";

type MessagesMobileCardsProps = {
  messages: Message[];
  skeleton: boolean;
  onViewMessage: (msg: Message) => void;
};

export default function MessagesMobileCards({ messages, skeleton, onViewMessage }: MessagesMobileCardsProps) {
  if (skeleton) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow flex flex-col gap-2 animate-pulse">
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
            <div className="h-3 w-16 bg-gray-100 rounded"></div>
            <div className="h-3 w-40 bg-gray-100 rounded"></div>
            <div className="flex gap-2 mt-2">
              <div className="h-6 w-8 bg-blue-200 rounded"></div>
              <div className="h-6 w-8 bg-fuchsia-200 rounded"></div>
              <div className="h-6 w-8 bg-orange-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map(m => (
        <div key={m.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
          <div className="text-lg font-medium">{m.name}</div>
          <div className="text-xs text-gray-700">{m.email} &middot; {m.phone}</div>
          <div className="text-sm text-gray-600">{m.messageType} &bull; {m.templateName}</div>
          <div className="text-xs text-gray-400">{format(new Date(m.sentDate), "yyyy-MM-dd")}</div>
          <div className="truncate text-gray-700">{m.content}</div>
          <div className="flex gap-1 mt-2">
            <MessagesQuickActions message={m} onView={onViewMessage} />
          </div>
        </div>
      ))}
    </div>
  );
}
