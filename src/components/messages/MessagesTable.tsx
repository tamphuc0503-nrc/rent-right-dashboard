
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import MessagesQuickActions from "./MessagesQuickActions";
import type { Message } from "./types";

type MessagesTableProps = {
  messages: Message[];
  skeleton: boolean;
  onViewMessage: (msg: Message) => void;
};

export default function MessagesTable({ messages, skeleton, onViewMessage }: MessagesTableProps) {
  if (skeleton) {
    return (
      <div className="p-6 space-y-2 bg-white rounded-md border shadow">
        {[...Array(12)].map((_, i) => (
          <div className="flex items-center gap-4" key={i}>
            <Skeleton className="w-1/6 h-6" />
            <Skeleton className="w-1/6 h-6" />
            <Skeleton className="w-1/12 h-6" />
            <Skeleton className="w-1/12 h-6" />
            <Skeleton className="w-1/6 h-6" />
            <Skeleton className="w-1/5 h-6" />
            <Skeleton className="w-20 h-8" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md border shadow p-0 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Sent Date</TableHead>
            <TableHead>Message Type</TableHead>
            <TableHead>Template Name</TableHead>
            <TableHead>Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No messages found.
              </TableCell>
            </TableRow>
          ) : (
            messages.map(m => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell>{format(new Date(m.sentDate), "yyyy-MM-dd")}</TableCell>
                <TableCell>{m.messageType}</TableCell>
                <TableCell>{m.templateName}</TableCell>
                <TableCell>
                  <MessagesQuickActions message={m} onView={onViewMessage} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
