import { useState } from "react";
import { useDeals } from "../hooks/useDeals";
import Table, { type Column } from "../components/Table";
import { type Deal } from "../types/Deal";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const Archive = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, error } = useDeals({
    dealStatuses: "ARCHIVED",
    pageNumber: page,
    pageSize: PAGE_SIZE,
    searchText: searchQuery,
  });

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading deals</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Archived Deals</h1>
      </div>

      {/* Search Section */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-2 items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            onEnterPress={handleSearch}
            placeholder="Search archived deals..."
          />
          <Button onClick={handleSearch} variant="primary">
            ძებნა
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table<Deal>
        columns={columns}
        data={deals}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        onRowClick={(row: Deal) => navigate(`/deals/${row.id}`)}
      />
    </div>
  );
};

export default Archive;
