import React, { useState } from "react";
import { FiCheckCircle, FiChevronDown, FiChevronUp, FiMail, FiStar } from "react-icons/fi";
import { useNotifications } from "../hooks/useNotifications";
import { useNotificationDetail } from "../hooks/useNotificationDetail";

const NotificationBox: React.FC = () => {
  const { data } = useNotifications();
  const [openId, setOpenId] = useState<number | null>(null);

  const { data: detail } = useNotificationDetail(openId ?? undefined);

  const notifications = data?.content ?? [];

  return (
    <div className="w-80 bg-white border rounded-md shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b text-sm font-semibold text-gray-800">
        Notifications
      </div>

      {notifications.map((n) => {
        const isOpen = n.id === openId;

        return (
          <div key={n.id} className="border-b last:border-b-0">
            {/* Notification row */}
            <button
              onClick={() => setOpenId(isOpen ? null : n.id)}
              className="w-full px-3 py-2 flex justify-between items-center hover:bg-gray-50"
            >
              <span
                className={`text-sm ${
                  n.isRead ? "text-gray-600" : "font-medium text-gray-900"
                }`}
              >
                {n.title}
              </span>

              <div className="flex items-center gap-3">
                {/* Read / Unread */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-gray-500 hover:text-blue-600"
                >
                  {n.isRead ? (
                    <FiCheckCircle size={16} />
                  ) : (
                    <FiMail size={16} />
                  )}
                </button>

                {/* Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`${
                    n.isFlagged
                      ? "text-yellow-500"
                      : "text-gray-400 hover:text-yellow-500"
                  }`}
                >
                  <FiStar size={16} />
                </button>

                {isOpen ? (
                  <FiChevronUp size={16} />
                ) : (
                  <FiChevronDown size={16} />
                )}
              </div>
            </button>

            {/* Expanded details */}
            {isOpen && detail && (
              <div className="px-4 py-3 bg-gray-50 text-xs space-y-2">
                {/* Created at */}
                <div className="text-gray-500">
                  {new Date(detail.notification.createdAt).toLocaleString()}
                </div>

                {/* Messages */}
                {detail.messages
                  .sort((a, b) => a.order - b.order)
                  .map((m) => {
                    // 🔧 აქვე ხდება parameters ჩასმა
                    let text = m.messageText;

                    m.parameters.forEach((p) => {
                      text = text.replace(p.key, p.value);
                    });

                    return (
                      <div key={m.id} className="text-gray-700">
                        {text}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationBox;
