
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Send, Archive } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { Message } from "./types";

type MessagesQuickActionsProps = {
  message: Message;
  onView: (msg: Message) => void;
};

export default function MessagesQuickActions({ message, onView }: MessagesQuickActionsProps) {
  return (
    <div className="flex gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700"
            title="View"
            onClick={() => onView(message)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={5}>
          View
          <div data-radix-tooltip-arrow="" className="bg-black" />
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-600"
            title="Resend"
            onClick={() => alert("Resend clicked")}
          >
            <Send className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={5}>
          Resend
          <div data-radix-tooltip-arrow="" className="bg-black" />
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="bg-orange-100 hover:bg-orange-200 text-orange-700"
            title="Archive"
            onClick={() => alert("Archive clicked")}
          >
            <Archive className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={5}>
          Archive
          <div data-radix-tooltip-arrow="" className="bg-black" />
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
