
import React, { useState } from "react";
import { X } from "lucide-react";
import GeneralSettings from "@/pages/settings/GeneralSettings";
import CustomFields from "@/pages/settings/CustomFields";
import Templates from "@/pages/settings/Templates";
import DocusignKeys from "@/pages/settings/DocusignKeys";

const settingsMenu = [
  { key: "general", label: "General" },
  { key: "custom-fields", label: "Custom Fields" },
  { key: "templates", label: "Templates" },
  { key: "docusign", label: "DocuSign Keys" },
];

export type SettingsPanelProps = {
  open: boolean;
  onClose: () => void;
  initialTab?: string;
};

const panelContents: Record<string, React.ReactNode> = {
  "general": <GeneralSettings />,
  "custom-fields": <CustomFields />,
  "templates": <Templates />,
  "docusign": <DocusignKeys />,
};

export function SettingsPanel({ open, onClose, initialTab = "general" }: SettingsPanelProps) {
  const [tab, setTab] = useState(initialTab);

  React.useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  // The panel is now only used for direct access from the UI, not from the sidebar
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-stretch">
      <div className="w-full md:w-[500px] bg-white shadow-xl ml-auto h-full flex flex-col animate-in slide-in-from-right-20 duration-300">
        <header className="flex items-center justify-between p-5 border-b">
          <h2 className="font-bold text-lg">Settings</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </header>
        <nav className="flex border-b">
          {settingsMenu.map(item => (
            <button
              key={item.key}
              className={`flex-1 px-4 py-2 text-sm transition-colors border-b-2 ${
                tab === item.key ? "border-accent font-semibold text-accent-foreground" : "border-transparent text-gray-600"
              }`}
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex-1 overflow-y-auto p-4">
          {panelContents[tab]}
        </div>
      </div>
      {/* Click outside to close - optional */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}

export default SettingsPanel;
