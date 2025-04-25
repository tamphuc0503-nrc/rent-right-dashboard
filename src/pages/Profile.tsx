
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function Profile() {
  const isMobile = useIsMobile();

  // Simulate fetching the user from localStorage with fallback
  const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState({
    name: userFromStorage.name || "Jane Doe",
    email: userFromStorage.email || "jane.doe@example.com",
    phone: userFromStorage.phone || "+1 (555) 123-4567",
    role: userFromStorage.role || "Property Manager",
    company: userFromStorage.company || "Example Realty",
    address: userFromStorage.address || "100 Main St, Sampletown, NY 10001",
    avatar: userFromStorage.avatar || null,
  });

  const [uploading, setUploading] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload(); // force update everywhere
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? "" : "ml-[var(--sidebar-width,256px)]"}`}>
        <DashboardHeader />
        <main className="p-6 max-w-2xl mx-auto">
          <form
            className="bg-white rounded-md shadow p-6 border flex flex-col items-center gap-4"
            onSubmit={handleUpdate}
          >
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-realestate-200 flex items-center justify-center text-3xl text-realestate-700 font-bold overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute right-0 bottom-0 flex items-center justify-center bg-white rounded-full shadow w-8 h-8 cursor-pointer border-2 border-gray-200 hover:bg-gray-100 transition"
                title="Upload avatar"
              >
                <Camera className="w-5 h-5 text-gray-600" />
                <input
                  id="avatar-upload"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
              </label>
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <label className="text-xs">Name</label>
              <Input
                value={user.name}
                name="name"
                onChange={handleInputChange}
                className="mb-1"
                required
              />
              <label className="text-xs">Email</label>
              <Input
                value={user.email}
                name="email"
                onChange={handleInputChange}
                className="mb-1"
                required
                type="email"
              />
              <label className="text-xs">Phone</label>
              <Input
                value={user.phone}
                name="phone"
                onChange={handleInputChange}
                className="mb-1"
              />
              <label className="text-xs">Role</label>
              <Input
                value={user.role}
                name="role"
                onChange={handleInputChange}
                className="mb-1"
              />
              <label className="text-xs">Company</label>
              <Input
                value={user.company}
                name="company"
                onChange={handleInputChange}
                className="mb-1"
              />
              <label className="text-xs">Address</label>
              <Input
                value={user.address}
                name="address"
                onChange={handleInputChange}
                className="mb-1"
              />
            </div>
            <Button
              type="submit"
              className="mt-3 bg-realestate-700 text-white hover:bg-realestate-800"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
