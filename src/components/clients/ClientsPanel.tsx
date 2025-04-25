
import React from "react";
import DummyClientList from "@/pages/Clients";

type ClientsPanelProps = {
  open: boolean;
  onClose: () => void;
};

const panelStyles = "fixed top-0 right-0 h-full w-full max-w-2xl z-[200] shadow-lg bg-white border-l border-gray-200 transition-transform duration-300";
const backdropStyles = "fixed inset-0 bg-black/20 z-[150]";

export default function ClientsPanel({ open, onClose }: ClientsPanelProps) {
  if (!open) return null;

  return (
    <>
      <div className={backdropStyles} onClick={onClose} />
      <div className={panelStyles} style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}>
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Clients</h2>
          <button className="text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Close" onClick={onClose}>
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 70px)' }}>
          <DummyClientList noTitle />
        </div>
      </div>
    </>
  );
}
