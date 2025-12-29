import React from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface GroupBoxProps {
  id: string; // ✅ დამატებულია
  title: string;
  description?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const GroupBox: React.FC<GroupBoxProps> = ({
  id,
  title,
  description,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/manage/groups/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-md">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit"
          >
            <FiEdit3 size={18} />
          </button>

          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* View More */}
        <button
          onClick={handleViewMore}
          className="text-sm text-gray-600 hover:underline"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default GroupBox;
