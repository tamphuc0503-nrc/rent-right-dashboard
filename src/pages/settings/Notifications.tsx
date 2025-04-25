
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Notifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Manage how you receive notifications.
            </p>
          </div>
          <div className="grid gap-4">
            {/* Dummy notification settings */}
            <div className="p-4 border rounded">
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Enabled</p>
            </div>
            <div className="p-4 border rounded">
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Disabled</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
