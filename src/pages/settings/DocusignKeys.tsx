
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocusignKeys() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DocuSign Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">API Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Manage your DocuSign API integration settings.
            </p>
          </div>
          <div className="grid gap-4">
            {/* Dummy API settings */}
            <div className="p-4 border rounded">
              <p className="font-medium">Integration Status</p>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
            <div className="p-4 border rounded">
              <p className="font-medium">Environment</p>
              <p className="text-sm text-muted-foreground">Production</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
