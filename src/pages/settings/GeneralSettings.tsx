import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GeneralSettings() {
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAvatarUrl(URL.createObjectURL(file));
      setIsUploading(false);
      toast({
        title: "Success",
        description: "Profile photo updated successfully",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Profile Information</h3>
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="relative">
                  {isUploading && (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {isUploading ? "Uploading..." : "Change photo"}
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </Button>
                <p className="text-sm text-muted-foreground">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4">
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
