import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";

import { useGroupUsers } from "../hooks/useGroupUsers";
import { useGroupUserStatus } from "../hooks/useGroupUserStatus";
import { useUnassignGroupUser } from "../hooks/useUnassignGroupUser";

import GroupUserBox from "../components/GroupUserBox";
import SearchInput from "../components/SearchInput";
import Modal from "../components/Modal";
import AddUserForm from "../components/Forms/AddUserForm";
import { useGroups } from "../hooks/useGroups";

const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [searchText, setSearchText] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const { data, isLoading, isError } = useGroupUsers({
    groupId: id ?? "",
    searchText,
  });

  const { data: groups } = useGroups("");

  const { mutate: updateStatus } = useGroupUserStatus();
  const { mutate: unassignUser } = useUnassignGroupUser();

  const groupName = groups?.find((g) => g.id === id)?.name;

  if (!id) {
    return <p className="text-sm text-red-500">Group ID არ მოიძებნა</p>;
  }

  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        {/* GROUP NAME */}
        <h1 className="text-2xl font-semibold text-gray-800">
          {groupName ?? "ჯგუფი"}
        </h1>

        {/* SEARCH + ADD */}
        <div className="flex items-center gap-2">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            placeholder="ძებნა"
            className="w-64"
          />

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            title="მონაწილის დამატება"
          >
            <MdAdd size={22} />
          </button>
        </div>
      </div>

      {/* USERS GRID */}
      <div className="grid grid-cols-2 gap-4">
        {isLoading && <p className="col-span-2 text-center">იტვირთება...</p>}
        {isError && (
          <p className="col-span-2 text-center text-red-500">შეცდომა მოხდა</p>
        )}

        {data?.map((user) => (
          <GroupUserBox
            key={user.externalId}
            fullName={user.fullName}
            count={user.managedDepartmentIds.length}
            status={user.status === "ACTIVE" ? "ACTIVE" : "DEACTIVATED"}
            onToggle={(nextStatus) => {
              updateStatus({
                userId: user.externalId,
                status: nextStatus,
              });
            }}
            onDelete={() => {
              unassignUser({
                groupId: id,
                userExternalId: user.externalId,
              });
            }}
          />
        ))}
      </div>

      {/* ➕ ADD USER MODAL */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="მონაწილის დამატება"
        width="max-w-md"
      >
        <AddUserForm
          groupId={id}
          onSuccess={() => setIsAddUserModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default GroupDetails;
