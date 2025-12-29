import React from "react";
import { FiUser, FiTrash2 } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

/* 👉 აქ იყო პრობლემა — props ტიპი არ არსებობდა */
type GroupUserBoxProps = {
  avatarUrl?: string;
  fullName: string;
  count: number;
  status: "ACTIVE" | "DEACTIVATED";
  onToggle?: (nextStatus: "ACTIVE" | "DEACTIVATED") => void;
  onDelete?: () => void;
};

const GroupUserBox: React.FC<GroupUserBoxProps> = ({
  avatarUrl,
  fullName,
  count,
  status,
  onToggle,
  onDelete,
}) => {
  const enabled = status === "ACTIVE";

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <FiUser className="text-gray-500" size={18} />
        )}
      </div>

      {/* Name */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{fullName}</p>
        <p className="text-xs text-gray-400">მონაწილე</p>
      </div>

      {/* Count */}
      <div className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-700">
        {count}
      </div>

      {/* Toggle */}
      <button
        onClick={() => onToggle?.(enabled ? "DEACTIVATED" : "ACTIVE")}
        className="transition"
        aria-label="toggle user"
      >
        {enabled ? (
          <FaToggleOn size={28} className="text-green-500" />
        ) : (
          <FaToggleOff size={28} className="text-gray-400" />
        )}
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="text-red-400 hover:text-red-600 transition"
        aria-label="delete user"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
};

export default GroupUserBox;
