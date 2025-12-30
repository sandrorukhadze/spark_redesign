import React, { useState } from "react";
import {
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiMail,
  FiStar,
} from "react-icons/fi";
import { useNotifications } from "../hooks/useNotifications";
import { useNotificationDetail } from "../hooks/useNotificationDetail";
import { useSetNotificationRead } from "../hooks/useSetNotificationRead";
import { useSetNotificationFlag } from "../hooks/useSetNotificationFlag";

const NotificationBox: React.FC = () => {
  const { data } = useNotifications();
  const [openId, setOpenId] = useState<number | null>(null);

  const { data: detail } = useNotificationDetail(openId ?? undefined);

  const notifications = data?.content ?? [];
  const { mutate: setReadStatus } = useSetNotificationRead();
  const { mutate: setFlagStatus } = useSetNotificationFlag();

  return (
    <div className="w-80 bg-white border rounded-md shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b text-sm font-semibold text-gray-800">
        Notifications
      </div>

      {/* 🔽 SCROLLABLE LIST */}
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((n) => {
          const isOpen = n.id === openId;

          return (
            <div key={n.id} className="border-b last:border-b-0">
              {/* Notification row */}
              <button
                onClick={() => {
                  if (!isOpen) {
                    // 🔔 თუ პირველად იხსნება — ჩაითვალოს წაკითხულად
                    if (!n.isRead) {
                      setReadStatus({
                        id: n.id,
                        isRead: true,
                      });
                    }

                    setOpenId(n.id);
                  } else {
                    setOpenId(null);
                  }
                }}
                className="w-full px-3 py-2 flex justify-between items-start hover:bg-gray-50 text-left"
              >
                <span
                  className={`text-sm block pr-2 ${
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
                      setReadStatus({
                        id: n.id,
                        isRead: !n.isRead,
                      });
                    }}
                    title={n.isRead ? "წაკითხულია" : "წაუკითხავია"}
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
                      setFlagStatus({
                        id: n.id,
                        isFlagged: !n.isFlagged,
                      });
                    }}
                    title={n.isFlagged ? "Unfavorite" : "Favorite"}
                    className={`transition ${
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
                  <div className="text-gray-500">
                    {new Date(detail.notification.createdAt).toLocaleString()}
                  </div>

                  {detail.messages
                    .sort((a, b) => a.order - b.order)
                    .map((m) => {
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
    </div>
  );
};

export default NotificationBox;
