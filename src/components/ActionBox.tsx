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
    icon: <MdCall className="text-blue-500" size={20} />,
    onClick: () => {
      console.log("დარეკვა");
    },
  },
  {
    key: "edit",
    label: "შეცვლა",
    icon: <MdEdit className="text-green-500" size={20} />,
    onClick: () => {
      console.log("შეცვლა");
    },
  },
  {
    key: "status",
    label: "სტატუსი",
    icon: <MdTrackChanges className="text-orange-500" size={20} />,
    onClick: () => {
      console.log("სტატუსი");
    },
  },
  {
    key: "sign",
    label: "ხელმოწერა",
    icon: <MdDraw className="text-purple-500" size={20} />,
    onClick: () => {
      console.log("ხელმოწერა");
    },
  },
  {
    key: "comment",
    label: "კომენტარი",
    icon: <MdComment className="text-gray-600" size={20} />,
    onClick: () => {
      console.log("კომენტარი");
    },
  },
];

const ActionBox: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">⚙️ ქმედებები</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded transition"
          >
            {action.icon}
            <span className="mt-2 text-sm text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionBox;
