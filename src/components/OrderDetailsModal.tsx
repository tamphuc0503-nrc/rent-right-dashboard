
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { GeneralSection } from "./order-form/GeneralSection";
import { PropertySection } from "./order-form/PropertySection";
import { ServicesSection } from "./order-form/ServicesSection";
import { AgentsSection } from "./order-form/AgentsSection";
import { FeesSection } from "./order-form/FeesSection";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedPopover } from "@/components/ui/AnimatedPopover";
import React, { useState } from "react";

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
  anchorPoint?: { x: number; y: number };
};

const steps = [
  { id: "general", title: "General" },
  { id: "property", title: "Property" },
  { id: "services", title: "Add-ons" },
  { id: "agents", title: "Agents" },
  { id: "fees", title: "Fees" },
];

export default function OrderDetailsModal({
  isOpen,
  onClose,
  mode,
  order,
  anchorPoint,
}: OrderDetailsModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
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

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    const currentStepId = steps[currentStep].id;
    switch (currentStepId) {
      case "general":
        return <GeneralSection form={form} />;
      case "property":
        return <PropertySection form={form} />;
      case "services":
        return <ServicesSection form={form} />;
      case "agents":
        return <AgentsSection form={form} />;
      case "fees":
        return <FeesSection form={form} />;
      default:
        return null;
    }
  };

  return (
    <AnimatedPopover open={isOpen} onOpenChange={o => !o && onClose()} anchorPoint={anchorPoint}>
      <div className="w-[400px] max-w-full h-[70vh] max-h-[70vh] flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
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
        </div>
        
        {mode !== 'view' && (
          <div className="mb-4">
            {/* Steps indicator */}
            <div className="flex justify-between mb-2">
              {steps.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center ${idx <= currentStep ? 'text-primary' : 'text-gray-400'}`}
                >
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                    ${idx <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {idx + 1}
                  </div>
                  <div className="text-xs mt-1">{step.title}</div>
                </div>
              ))}
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 h-1 rounded-full">
              <div 
                className="bg-primary h-1 rounded-full transition-all"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <Form {...form}>
          <form className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto px-1">
              {mode === 'view' ? (
                <div className="space-y-4">
                  <div className="font-medium text-gray-800">Client Name</div>
                  <div>{order?.clientName || <span className="text-gray-400">-</span>}</div>
                  <div className="font-medium text-gray-800">Client Email</div>
                  <div>{order?.clientEmail || <span className="text-gray-400">-</span>}</div>
                  {/* Additional order details would be shown here */}
                </div>
              ) : (
                renderStepContent()
              )}
            </div>
            
            {mode !== 'view' && (
              <div className="border-t pt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? 'opacity-50' : ''}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" onClick={form.handleSubmit((data) => {
                    console.log(data);
                    onClose();
                  })}>
                    {mode === 'add' ? 'Create' : 'Save Changes'}
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>
      </div>
    </AnimatedPopover>
  );
}
