
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

// Define the Activity type that was missing
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
      // Property fields
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
      // Services
      services: {
        flexfund: false,
        mold: false,
      },
      // Agent fields
      agentName: "",
      agentEmail: "",
      agentPhone: "",
      isSeller: false,
      isBuyer: false,
      // Fee fields
      inspectionFee: "",
      thirdPartyFee: "",
      discountFee: "",
      processingFee: "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'New Inspection Order' : mode === 'edit' ? 'Edit Inspection Order' : 'View Inspection Order'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="property">Property</TabsTrigger>
                <TabsTrigger value="services">Add-ons</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <GeneralSection form={form} />
              </TabsContent>
              <TabsContent value="property">
                <PropertySection form={form} />
              </TabsContent>
              <TabsContent value="services">
                <ServicesSection form={form} />
              </TabsContent>
              <TabsContent value="agents">
                <AgentsSection form={form} />
              </TabsContent>
              <TabsContent value="fees">
                <FeesSection form={form} />
              </TabsContent>
            </Tabs>
          </form>
        </Form>

        {mode !== 'view' && (
          <DialogFooter>
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
