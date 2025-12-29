import { NavLink } from "react-router-dom";
import {
  FiInbox,
  FiCheckCircle,
  FiPause,
  FiArchive,
  FiPhone,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import logo from "../assets/images/sidebar.jpg";
import keycloak from "../lib/keycloak";
import { useState } from "react";

interface MenuItem {
  name: string;
  path?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { name: "Inbox", path: "/inbox", icon: <FiInbox /> },
  { name: "Active", path: "/active", icon: <FiCheckCircle /> },
  { name: "On Hold", path: "/onhold", icon: <FiPause /> },
  { name: "Archive", path: "/archive", icon: <FiArchive /> },
  { name: "Call Center", path: "/callcenter", icon: <FiPhone /> },
  {
    name: "Manage",
    icon: <FiSettings />,
    children: [
      { name: "Groups", path: "/manage/groups", icon: <FiCheckCircle /> },
      // აქ შეგიძლია დაამატო სხვა ქვეპუნქტებიც
    ],
  },
];

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-800 text-white flex flex-col items-center py-6 shadow-lg z-50">
      {/* Logo */}
      <div className="mb-10">
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 object-cover rounded-full border-4 border-gray-700 shadow-md"
        />
      </div>

      {/* Navigation */}
      <nav className="w-full px-6 space-y-2">
        {menuItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            return (
              <div key={item.name}>
                {/* Main parent item */}
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center w-full gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </button>

                {/* Dropdown children */}
                {openMenus[item.name] && (
                  <div className="pl-8 mt-1 space-y-1">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.path!}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-1 rounded-md text-sm transition-all
                          ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-400 hover:bg-gray-700 hover:text-white"
                          }`
                        }
                      >
                        <span className="text-base">{child.icon}</span>
                        <span>{child.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.path!}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="w-full px-6 mt-auto">
        <button
          onClick={() => keycloak.logout()}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-white hover:bg-red-600 transition"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 py-4">
        {new Date().getFullYear()} Basisbank
      </div>
    </aside>
  );
};

export default Sidebar;
