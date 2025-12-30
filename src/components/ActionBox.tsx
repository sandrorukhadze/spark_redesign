import React from "react";
import {
  MdCall,
  MdEdit,
  MdTrackChanges,
  MdDraw,
  MdComment,
} from "react-icons/md";

const actions = [
  {
    key: "call",
    label: "დარეკვა",
    icon: MdCall,
    color: "text-blue-500",
    onClick: () => console.log("დარეკვა"),
  },
  {
    key: "edit",
    label: "შეცვლა",
    icon: MdEdit,
    color: "text-green-500",
    onClick: () => console.log("შეცვლა"),
  },
  {
    key: "status",
    label: "სტატუსი",
    icon: MdTrackChanges,
    color: "text-orange-500",
    onClick: () => console.log("სტატუსი"),
  },
  {
    key: "sign",
    label: "ხელმოწერა",
    icon: MdDraw,
    color: "text-purple-500",
    onClick: () => console.log("ხელმოწერა"),
  },
  {
    key: "comment",
    label: "კომენტარი",
    icon: MdComment,
    color: "text-gray-600",
    onClick: () => console.log("კომენტარი"),
  },
];

const ActionBox: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-5 text-gray-900">⚙️ ქმედებები</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map(({ key, label, icon: Icon, color, onClick }) => (
          <button
            key={key}
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-white border border-gray-200 rounded-lg transition-transform transform hover:scale-[1.03] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <Icon className={`${color}`} size={24} />
            <span className="mt-2 text-sm font-medium text-gray-700">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionBox;
