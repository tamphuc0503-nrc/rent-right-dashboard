
import React from "react";

interface Activity {
  id: string;
  date: string;
  type: string;
  description: string;
}

type OrderActivityListProps = {
  activities?: Activity[];
};

export function OrderActivityList({ activities }: OrderActivityListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="font-semibold mb-2 text-gray-800">Activity</div>
      {!activities || activities.length === 0 ? (
        <div className="text-gray-500 text-sm">No activity to show.</div>
      ) : (
        <ul className="space-y-2 overflow-y-auto pr-2 max-h-[510px]">
          {activities.map((a, idx) => (
            <li key={a.id || idx} className="flex flex-col py-1 px-2 bg-gray-50 rounded">
              <span className="text-xs text-gray-600">
                {a.date} &mdash; <span className="font-medium">{a.type}</span>
              </span>
              <span className="text-sm">{a.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
