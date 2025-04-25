
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            {/* Dummy custom fields */}
            <div className="p-4 border rounded">
              <p className="font-medium">Active Custom Fields</p>
              <p className="text-sm text-muted-foreground">5 fields configured</p>
            </div>
            <div className="p-4 border rounded">
              <p className="font-medium">Last Modified</p>
              <p className="text-sm text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
