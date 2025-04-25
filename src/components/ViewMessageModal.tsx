
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  sentDate: string;
  content: string;
  messageType: string;
  templateName: string;
};

type ViewMessageModalProps = {
  message: Message;
  onClose: () => void;
};

export default function ViewMessageModal({ message, onClose }: ViewMessageModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" /> View Message
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <div>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            <span className="text-gray-900">{message.name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            <span className="text-gray-900">{message.email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Phone:</span>{" "}
            <span className="text-gray-900">{message.phone}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Sent Date:</span>{" "}
            <span className="text-gray-900">{message.sentDate}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Message Type:</span>{" "}
            <span className="text-gray-900">{message.messageType}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Template Name:</span>{" "}
            <span className="text-gray-900">{message.templateName}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Content:</span>
            <div className="bg-gray-100 rounded-md p-2 mt-1 text-gray-900">
              {message.content}
            </div>
          </div>
        </div>
        <DialogFooter className="pt-2">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
