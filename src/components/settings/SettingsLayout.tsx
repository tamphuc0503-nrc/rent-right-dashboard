
import { useState } from "react";
import GeneralSettings from "@/pages/settings/GeneralSettings";
import ChangePassword from "@/pages/settings/ChangePassword";
import Notifications from "@/pages/settings/Notifications";
import DocusignKeys from "@/pages/settings/DocusignKeys";
import CustomFields from "@/pages/settings/CustomFields";
import Templates from "@/pages/settings/Templates";

const settingsMenuItems = [
  {
    title: "General",
    key: "general",
    description: "Manage your basic account settings"
  },
  {
    title: "Change Password",
    key: "password",
    description: "Update your security credentials"
  },
  {
    title: "Notifications",
    key: "notifications",
    description: "Configure your notification preferences"
  },
  {
    title: "DocuSign Keys",
    key: "docusign",
    description: "Manage your DocuSign integration"
  },
  {
    title: "Custom Fields",
    key: "custom-fields",
    description: "Configure custom data fields"
  },
  {
    title: "Templates",
    key: "templates",
    description: "Customize templates for outgoing messages"
  }
];

// Map keys to component
const settingsComponents: Record<string, JSX.Element> = {
  "general": <GeneralSettings />,
  "password": <ChangePassword />,
  "notifications": <Notifications />,
  "docusign": <DocusignKeys />,
  "custom-fields": <CustomFields />,
  "templates": <Templates />,
};

export default function SettingsLayout() {
  // Select General as default active page
  const [activePage, setActivePage] = useState("general");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <nav className="flex flex-col space-y-1">
            {settingsMenuItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActivePage(item.key)}
                className={`flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors text-left w-full ${
                  activePage === item.key
                    ? "bg-accent text-accent-foreground font-semibold"
                    : ""
                }`}
              >
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="md:col-span-3">
          {/* Render active settings page */}
          {settingsComponents[activePage]}
        </div>
      </div>
    </div>
  );
}
