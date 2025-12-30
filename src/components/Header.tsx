import React, { useEffect, useRef, useState } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import NotificationBox from "./NotificationBox";
import { useNotifications } from "../hooks/useNotifications";
import keycloak from "../lib/keycloak";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const { data } = useNotifications();

  const unreadCount = data?.content.filter((n) => !n.isRead).length ?? 0;
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // ✅ გარეთ დაკლიკებაზე დაიხუროს
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800"></h1>

      {/* ✅ wrapper must be relative */}
      <div className="relative" ref={wrapRef}>
        <div className="flex items-center gap-4">
          {/* Bell */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Open notifications"
          >
            <FiBell
              className={`w-6 h-6 ${
                unreadCount > 0 ? "text-blue-600" : "text-gray-600"
              }`}
            />

            {/* 🔴 Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center rounded-full bg-red-500 text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User */}
          {/* User */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="User menu"
            >
              <FiUser className="w-6 h-6 text-gray-600" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 z-50 bg-white border rounded shadow-md p-4 w-48">
                <h1 className="text-sm font-semibold mb-2">User Profile</h1>
                <button
                  onClick={() => keycloak.logout()}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-100 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ✅ dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 z-50">
            <NotificationBox />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
