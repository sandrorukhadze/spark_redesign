import { useState } from "react";
import { useAssignGroupUser } from "../../hooks/useAssignGroupUser";
import AllUsersDropdown from "../Dropdowns/allUsersDropdown";

type Props = {
  groupId: string;
  onSuccess: () => void;
};

const AddUserForm = ({ groupId, onSuccess }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { mutate: assignUser, isPending } = useAssignGroupUser();

  const handleAdd = () => {
    if (!selectedUserId) return;

    assignUser(
      {
        groupId,
        userExternalId: selectedUserId,
      },
      {
        onSuccess: () => {
          onSuccess(); // modal დახურვა
          setSelectedUserId(""); // reset
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <AllUsersDropdown
        value={selectedUserId}
        onChange={(val) => setSelectedUserId(val as string)}
      />

      <div className="flex justify-end pt-4">
        <button
          onClick={handleAdd}
          disabled={!selectedUserId || isPending}
          className={`px-4 py-2 rounded text-white transition ${
            selectedUserId && !isPending
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isPending ? "დამატება..." : "დამატება"}
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;
