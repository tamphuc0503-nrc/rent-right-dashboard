
import React from "react";

const templatesData = [
  { name: "Order Confirmation", type: "Email" },
  { name: "Inspection Reminder", type: "SMS" },
  { name: "Service Agreement", type: "PDF" },
];

export default function Templates() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Templates</h2>
      <div className="rounded border bg-white shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-accent">
              <th className="p-3">Template Name</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {templatesData.map((tpl, idx) => (
              <tr key={idx} className="border-t hover:bg-accent/30 transition">
                <td className="p-3">{tpl.name}</td>
                <td className="p-3">{tpl.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
