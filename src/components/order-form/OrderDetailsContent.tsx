import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { GeneralSection } from "./GeneralSection";
import { PropertySection } from "./PropertySection";
import { ServicesSection } from "./ServicesSection";
import { AgentsSection } from "./AgentsSection";
import { FeesSection } from "./FeesSection";
import { Separator } from "@/components/ui/separator";

interface Activity {
  id: string;
  date: string;
  type: string;
  description: string;
}

export type OrderDetailsContentProps = {
  order: {
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    status?: string;
    propertyType?: string;
    yearBuilt?: string;
    propertyAge?: string;
    foundationType?: string;
    gateCode?: string;
    lockboxCode?: string;
    mlsNumber?: string;
    isClientAttending?: boolean;
    isOccupied?: boolean;
    hasUtilities?: boolean;
    hasAlarm?: boolean;
    services?: any;
    agentName?: string;
    agentEmail?: string;
    agentPhone?: string;
    isSeller?: boolean;
    isBuyer?: boolean;
    inspectionFee?: string | number;
    thirdPartyFee?: string | number;
    discountFee?: string | number;
    processingFee?: string | number;
  };
  form: any;
  editable?: boolean;
};

/**
 * Renders all sections (tabs) for inspection order details.
 * Activities section removed; handled by OrderActivityList instead.
 */
export function OrderDetailsContent({ order, form, editable = false }: OrderDetailsContentProps) {
  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="general" className="h-full flex flex-col">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="property">Property</TabsTrigger>
          <TabsTrigger value="services">Add-ons</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-auto px-1">
          <TabsContent value="general">
            {form ? <GeneralSection form={form} /> : (
              <div className="space-y-2 py-3">
                <div>
                  <div className="font-medium text-gray-800">Client Name</div>
                  <div>{order.clientName || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Client Email</div>
                  <div>{order.clientEmail || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Client Phone</div>
                  <div>{order.clientPhone || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Status</div>
                  <div>{order.status || <span className="text-gray-400">-</span>}</div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="property">
            {form ? <PropertySection form={form} /> : (
              <div className="space-y-2 py-3 text-gray-700">
                <div>
                  <div className="font-medium text-gray-800">Property Type</div>
                  <div>{order.propertyType || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Year Built</div>
                  <div>{order.yearBuilt || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Property Age</div>
                  <div>{order.propertyAge || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Foundation Type</div>
                  <div>{order.foundationType || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Gate Code</div>
                  <div>{order.gateCode || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Lockbox Code</div>
                  <div>{order.lockboxCode || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">MLS Number</div>
                  <div>{order.mlsNumber || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Client Attending?</div>
                  <div>{order.isClientAttending ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Occupied?</div>
                  <div>{order.isOccupied ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Utilities?</div>
                  <div>{order.hasUtilities ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Alarm?</div>
                  <div>{order.hasAlarm ? "Yes" : "No"}</div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="services">
            {form ? <ServicesSection form={form} /> : (
              <div className="py-3">
                <div className="font-medium text-gray-800 mb-1">Add-ons</div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {order.services && Object.entries(order.services)
                    .filter(([, v]) => v)
                    .map(([k]) => <li key={k}>{k}</li>)}
                  {(!order.services || Object.values(order.services).every(v => !v)) && (
                    <li className="text-gray-400">None</li>
                  )}
                </ul>
              </div>
            )}
          </TabsContent>
          <TabsContent value="agents">
            {form ? <AgentsSection form={form} /> : (
              <div className="space-y-2 py-3 text-gray-700">
                <div>
                  <div className="font-medium text-gray-800">Agent Name</div>
                  <div>{order.agentName || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Agent Email</div>
                  <div>{order.agentEmail || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Agent Phone</div>
                  <div>{order.agentPhone || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Seller's Agent?</div>
                  <div>{order.isSeller ? "Yes" : "No"}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Buyer's Agent?</div>
                  <div>{order.isBuyer ? "Yes" : "No"}</div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="fees">
            {form ? <FeesSection form={form} /> : (
              <div className="space-y-2 py-3 text-gray-700">
                <div>
                  <div className="font-medium text-gray-800">Inspection Fee</div>
                  <div>{order.inspectionFee || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Third Party Fee</div>
                  <div>{order.thirdPartyFee || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Discount</div>
                  <div>{order.discountFee || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Card Processing Fee</div>
                  <div>{order.processingFee || <span className="text-gray-400">-</span>}</div>
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
      <Separator className="my-3"/>
    </div>
  );
}
