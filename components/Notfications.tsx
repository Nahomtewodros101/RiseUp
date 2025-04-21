"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

type Notification = {
  id: string;
  message: string;
  type: string;
  scheduled: boolean;
  scheduledDate?: string;
  targetAudience: string;
  isPriority: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        📣 Latest Updates & Alerts
      </h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">
          You are all caught up! 🎉 No notifications at the moment.
        </p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`border-l-4 p-4 rounded-lg shadow transition-all duration-200 ${
                n.type === "alert"
                  ? "border-red-500 bg-red-50"
                  : n.type === "info"
                  ? "border-blue-500 bg-blue-50"
                  : "border-green-500 bg-green-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                    {n.type}{" "}
                    {n.isPriority && (
                      <span className="ml-2 text-red-600 font-bold">
                        🔥 PRIORITY
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {n.message}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    For: <span className="font-medium">{n.targetAudience}</span>
                  </p>
                  {n.scheduled && n.scheduledDate && (
                    <p className="text-sm text-yellow-700 mt-1">
                      ⏰ Scheduled for{" "}
                      {new Date(n.scheduledDate).toLocaleString()}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                  {formatDistanceToNow(new Date(n.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
