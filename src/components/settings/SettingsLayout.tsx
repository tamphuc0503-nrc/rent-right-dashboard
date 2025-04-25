
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const settingsMenuItems = [
  {
    title: "General Settings",
    path: "/settings/general",
    description: "Manage your basic account settings"
  },
  {
    title: "Change Password",
    path: "/settings/password",
    description: "Update your security credentials"
  },
  {
    title: "Notifications",
    path: "/settings/notifications",
    description: "Configure your notification preferences"
  },
  {
    title: "DocuSign Keys",
    path: "/settings/docusign",
    description: "Manage your DocuSign integration"
  },
  {
    title: "Custom Fields",
    path: "/settings/custom-fields",
    description: "Configure custom data fields"
  }
];

export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Accordion type="single" collapsible defaultValue="settings">
            <AccordionItem value="settings">
              <AccordionTrigger>Settings Menu</AccordionTrigger>
              <AccordionContent>
                <nav className="flex flex-col space-y-1">
                  {settingsMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors ${
                        location.pathname === item.path
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      <span>{item.title}</span>
                      {location.pathname === item.path ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
