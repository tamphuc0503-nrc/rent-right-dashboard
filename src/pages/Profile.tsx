
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const isMobile = useIsMobile();
  // Dummy user for illustration
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Property Manager",
    company: "Example Realty",
    address: "100 Main St, Sampletown, NY 10001",
    avatarLetter: "J",
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isMobile={isMobile} />
      <div className={`flex-1 ${isMobile ? '' : 'ml-[var(--sidebar-width,256px)]'}`}>
        <DashboardHeader />
        <main className="p-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-md shadow p-6 border flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-realestate-200 flex items-center justify-center text-3xl text-realestate-700 font-bold">
              {user.avatarLetter}
            </div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <div className="w-full flex flex-col items-start gap-2">
              <label className="text-xs">Email</label>
              <Input value={user.email} readOnly className="mb-1" />
              <label className="text-xs">Phone</label>
              <Input value={user.phone} readOnly className="mb-1" />
              <label className="text-xs">Role</label>
              <Input value={user.role} readOnly className="mb-1" />
              <label className="text-xs">Company</label>
              <Input value={user.company} readOnly className="mb-1" />
              <label className="text-xs">Address</label>
              <Input value={user.address} readOnly className="mb-1" />
            </div>
            <Button className="mt-3 bg-realestate-700 text-white hover:bg-realestate-800">Edit Profile</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
