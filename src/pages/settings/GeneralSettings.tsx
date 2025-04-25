
import React from "react";

export default function GeneralSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">General Settings</h2>
      <ul className="space-y-2">
        <li>
          <strong>Account Status:</strong> Active
        </li>
        <li>
          <strong>Time Zone:</strong> Pacific Time (PT)
        </li>
        <li>
          <strong>Email:</strong> user@email.com
        </li>
      </ul>
    </div>
  );
}
