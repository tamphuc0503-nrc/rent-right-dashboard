
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Profile Information</h3>
            <p className="text-sm text-muted-foreground">
              Manage your basic account information and preferences.
            </p>
          </div>
          <div className="grid gap-4">
            {/* Dummy content */}
            <div className="p-4 border rounded">
              <p className="font-medium">Account Status</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
            <div className="p-4 border rounded">
              <p className="font-medium">Time Zone</p>
              <p className="text-sm text-muted-foreground">Pacific Time (PT)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
