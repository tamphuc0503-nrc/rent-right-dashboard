
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, FileText, Phone, Contract, X } from "lucide-react";

interface OrderActionModalProps {
  open: boolean;
  onClose: () => void;
  type: "invoice" | "emailReminder" | "smsReminder" | "agreement";
  client: { name: string; email: string };
  templates?: { label: string; value: string }[];
}

const ICONS = {
  invoice: <FileText className="mr-2 h-5 w-5" />,
  emailReminder: <Mail className="mr-2 h-5 w-5" />,
  smsReminder: <Phone className="mr-2 h-5 w-5" />,
  agreement: <Contract className="mr-2 h-5 w-5" />,
};

const TYPE_TITLE = {
  invoice: "Send Invoice",
  emailReminder: "Send Email Reminder",
  smsReminder: "Send SMS Reminder",
  agreement: "Send Agreement",
};

const DUMMY_TEMPLATES = [
  { label: "Default Template", value: "default" },
  { label: "Friendly Reminder", value: "friendly" },
];

export const OrderActionModal: React.FC<OrderActionModalProps> = ({
  open,
  onClose,
  type,
  client,
  templates
}) => {
  const [cc, setCc] = useState("");
  const [template, setTemplate] = useState(templates?.[0]?.value || "default");
  const [desc, setDesc] = useState(type === "agreement" ? "Sample agreement text goes here..." : "");
  const showTemplate = type !== "invoice";

  // Send action stub
  const handleSend = () => {
    // Call API here if needed
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {ICONS[type]}
            {TYPE_TITLE[type]}
          </DialogTitle>
          <DialogDescription>
            Customize message before sending to the client.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-3">
          <Input label="Client Name" readOnly value={client.name} className="bg-gray-100" />
          <Input label="Client Email" readOnly value={client.email} className="bg-gray-100" />
          <Input
            label="CC"
            placeholder="Enter additional email(s) or phone (for SMS), comma separated"
            value={cc}
            onChange={e => setCc(e.target.value)}
          />
          {showTemplate && (
            <div>
              <label className="block text-sm font-medium mb-1">Template</label>
              <select
                value={template}
                className="w-full rounded border px-3 py-2"
                onChange={e => setTemplate(e.target.value)}
              >
                {(templates || DUMMY_TEMPLATES).map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">{type === "agreement" ? "Agreement" : "Description"}</label>
            <Textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="min-h-[100px] bg-white"
              readOnly={type === "agreement"}
            />
          </div>
        </div>
        <DialogFooter className="mt-4 flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSend}>
            <Send className="mr-2 h-4 w-4" /> Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
