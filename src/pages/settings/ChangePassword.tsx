
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChangePassword() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Password Security</h3>
            <p className="text-sm text-muted-foreground">
              Update your password to maintain account security.
            </p>
          </div>
          <div className="grid gap-4">
            {/* Dummy form fields */}
            <div className="p-4 border rounded">
              <p className="font-medium">Last Password Change</p>
              <p className="text-sm text-muted-foreground">30 days ago</p>
            </div>
            <div className="p-4 border rounded">
              <p className="font-medium">Password Strength</p>
              <p className="text-sm text-muted-foreground">Strong</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
