import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSection } from "./order-form/GeneralSection";
import { PropertySection } from "./order-form/PropertySection";
import { ServicesSection } from "./order-form/ServicesSection";
import { AgentsSection } from "./order-form/AgentsSection";
import { FeesSection } from "./order-form/FeesSection";
import { ExternalLink } from "lucide-react";
import { OrderDetailsContent } from "./order-form/OrderDetailsContent";

interface Activity {
  id: string;
  date: string;
  type: string;
  description: string;
}

type OrderDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit' | 'add';
  order?: {
    id?: string;
    orderNumber?: string;
    propertyAddress?: string;
    inspectionDate?: string;
    status?: string;
    cost?: number;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    clientTags?: string[];
    activities?: Activity[];
  };
};

export default function OrderDetailsModal({
  isOpen,
  onClose,
  mode,
  order,
}: OrderDetailsModalProps) {
  const form = useForm({
    defaultValues: {
      clientName: order?.clientName || "",
      clientEmail: order?.clientEmail || "",
      clientPhone: order?.clientPhone || "",
      status: order?.status || "pending",
      propertyType: "",
      yearBuilt: "",
      propertyAge: "",
      foundationType: "",
      gateCode: "",
      lockboxCode: "",
      mlsNumber: "",
      isClientAttending: false,
      isOccupied: false,
      hasUtilities: false,
      hasAlarm: false,
      services: {
        flexfund: false,
        mold: false,
      },
      agentName: "",
      agentEmail: "",
      agentPhone: "",
      isSeller: false,
      isBuyer: false,
      inspectionFee: "",
      thirdPartyFee: "",
      discountFee: "",
      processingFee: "",
    },
  });

  const handleOpenInNewTab = () => {
    if (order?.id) {
      window.open(`/orders/${order.id}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[70vh] max-h-[70vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'view'
              ? (
                  <>
                    Order {order?.orderNumber ?? ""}
                    {order?.id && (
                      <button
                        className="ml-2 text-gray-500 hover:text-blue-500"
                        onClick={handleOpenInNewTab}
                        type="button"
                        tabIndex={0}
                        aria-label="Open order in new tab"
                      >
                        <ExternalLink size={18} />
                      </button>
                    )}
                  </>
                )
              : mode === 'add'
                ? 'New Inspection Order'
                : 'Edit Inspection Order'
            }
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="flex-1 overflow-hidden">
            <OrderDetailsContent order={order || {}} form={form} editable={mode !== 'view'} />
          </form>
        </Form>

        {mode !== 'view' && (
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={form.handleSubmit((data) => {
              console.log(data);
              onClose();
            })}>
              {mode === 'add' ? 'Create' : 'Save Changes'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
