
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const customFieldsData = [
  { name: "Foundation Type", type: "foundation-type", description: "Type of building foundation" },
  { name: "Roof Material", type: "add-on", description: "Material used for roofing" },
  { name: "Pool Type", type: "add-on", description: "Type of swimming pool if present" },
  { name: "HVAC System", type: "foundation-type", description: "Type of heating and cooling system" },
];

export default function CustomFields() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Field Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Manage custom fields for your forms and documents.
            </p>
          </div>
          <div className="grid gap-4">
            {customFieldsData.map((field, index) => (
              <div key={index} className="p-4 border rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{field.name}</p>
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                  </div>
                  <span className="text-sm px-2 py-1 bg-secondary rounded-full">
                    {field.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
