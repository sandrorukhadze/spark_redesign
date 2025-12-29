import { useState } from "react";
import { useDeals } from "../hooks/useDeals";
import { useUserMe } from "../hooks/useUserMe"; // ✅ მიიღე მომხმარებელი
import Table, { type Column } from "../components/Table";
import { type Deal } from "../types/Deal";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import { MdAdd } from "react-icons/md";
import Modal from "../components/Modal";
import CreateLeadForm from "../components/Forms/CreateLeadForm";

const PAGE_SIZE = 10;

const CreatedByMe = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 მომხმარებლის ინფორმაცია
  const { data: user, isLoading: isUserLoading } = useUserMe();

  // სანამ user-ს ვტვირთავთ, არაფერს ვაგზავნით
  const externalId = user?.externalId;

  const { data, isLoading, error } = useDeals(
    {
      pageNumber: page,
      pageSize: PAGE_SIZE,
      searchText: searchQuery,
      createdByExternalIds: externalId ? [externalId] : undefined,
    },
    {
      enabled: !!externalId, // ✅ query გაეშვება მხოლოდ როცა externalId არსებობს
    }
  );

  const deals = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const columns: Column<Deal>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Personal ID", accessor: "personalId" },
    { header: "Phone", accessor: "mobilePhone" },
    { header: "Channel", accessor: "channel" },
    { header: "Product", accessor: "product" },
    { header: "Amount", accessor: "amount" },
    { header: "Currency", accessor: "ccy" },
    { header: "Salary", accessor: "salary" },
    { header: "Created", accessor: "createDate" },
    {
      header: "Owner",
      accessor: "owner",
      render: (_, row) => row.owner?.fullName ?? "-",
    },
  ];

  const handleSearch = () => {
    setSearchQuery(search);
    setPage(0);
  };

  if (isUserLoading || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading deals</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Call-Center</h1>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex gap-2 items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            onEnterPress={handleSearch}
            placeholder="Search my deals..."
          />
          <Button onClick={handleSearch} variant="primary">
            ძებნა
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)} // 🟢 აქ უნდა გაიხსნას მოდალი
            variant="secondary"
          >
            <MdAdd className="mr-1" size={18} />
          </Button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="ლიდის დამატება"
        >
          <CreateLeadForm
            onSuccess={() => {
              setIsModalOpen(false); // მოდალის დახურვა
            }}
          />
        </Modal>
      </div>

      <Table<Deal>
        columns={columns}
        data={deals}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default CreatedByMe;
