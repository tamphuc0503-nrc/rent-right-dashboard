
import React from "react";

const customFieldsData = [
  { name: "Foundation Type", type: "foundation" },
  { name: "Roof Material", type: "add-on" },
  { name: "Property Type", type: "property type" },
  { name: "Pool Type", type: "add-on" },
  { name: "HVAC System", type: "foundation" },
];

export default function CustomFields() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Custom Fields</h2>
      <div className="rounded border bg-white shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-accent">
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {customFieldsData.map((field, idx) => (
              <tr key={idx} className="border-t hover:bg-accent/30 transition">
                <td className="p-3">{field.name}</td>
                <td className="p-3 capitalize">{field.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
