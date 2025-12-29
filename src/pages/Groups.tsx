import React, { useState } from "react";
import GroupBox from "../components/GroupBox";
import { useGroups } from "../hooks/useGroups";
import { MdAdd } from "react-icons/md";
import Modal from "../components/Modal";
import CreateGroupForm from "../components/Forms/CreateGroupForm";
import { useDeleteGroup } from "../hooks/useDeleteGroup";

const ITEMS_PER_PAGE = 9;

type EditingGroup = {
  id: string;
  name: string;
  description?: string;
};

const Groups = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<EditingGroup | null>(null);

  const { data: groups = [], isLoading, isError } = useGroups(searchText);
  const { mutate: deleteGroup } = useDeleteGroup();

  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentGroups = groups.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // reset pagination
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Groups</h1>

      {/* Header actions: Search + Add */}
      <div className="flex justify-end items-center gap-4">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search groups..."
          className="border border-gray-300 px-4 py-2 rounded w-full max-w-sm"
        />

        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
        >
          <MdAdd className="text-xl" />
        </button>
      </div>

      {/* Loading/Error/No Data */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to fetch groups.</p>
      ) : currentGroups.length === 0 ? (
        <p className="text-gray-500">No groups found.</p>
      ) : (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentGroups.map((group) => (
              <GroupBox
                key={group.id}
                id={group.id}
                title={group.name}
                description={group.description}
                onEdit={() =>
                  setEditingGroup({
                    id: group.id,
                    name: group.name,
                    description: group.description,
                  })
                }
                onDelete={() => {
                  deleteGroup({ groupId: group.id });
                }}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="ახალი ჯგუფი">
        <CreateGroupForm
          mode="create" // ✅ აი ეს აკლდა
          onSuccess={() => {
            closeModal();
          }}
        />
      </Modal>
      <Modal
        isOpen={!!editingGroup}
        onClose={() => setEditingGroup(null)}
        title="ჯგუფის რედაქტირება"
        width="max-w-md"
      >
        {editingGroup && (
          <CreateGroupForm
            key={editingGroup.id} // 🔑 მნიშვნელოვანია
            mode="edit"
            groupId={editingGroup.id}
            initialValues={{
              name: editingGroup.name,
              description: editingGroup.description,
            }}
            onSuccess={() => setEditingGroup(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Groups;
