import { useState } from "react";
import { useDeals } from "../hooks/useDeals";
import Table, { type Column } from "../components/Table";
import { type Deal } from "../types/Deal";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import {
  MdFileUpload,
  MdFilterList,
  MdOutlineSummarize,
  MdRefresh,
} from "react-icons/md";

const PAGE_SIZE = 10;

const Inbox = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const baseParams = {
    pageNumber: page,
    pageSize: PAGE_SIZE,
    searchText: searchQuery,
    ...(searchQuery === "" && {
      dealStatuses: ["ACTIVE"],
      progressStatuses: ["CLIENTS_IN_PROGRESS"],
    }),
  };

  const { data, isLoading, error } = useDeals(baseParams);

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
        <h1 className="text-2xl font-semibold">Inbox Deals</h1>
      </div>

      {/* Search input aligned right */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-2 items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            onEnterPress={handleSearch}
            placeholder="Search inbox..."
          />
          <Button onClick={handleSearch} variant="primary">
            ძებნა
          </Button>
          {/* Filter */}
          <button
            onClick={() => {
              // აქ გახსენი ფილტრის მოდალი ან ლოგიკა
            }}
            className="p-2 border rounded hover:bg-gray-100"
            title="ფილტრი"
          >
            <MdFilterList size={20} />
          </button>

          {/* File Upload */}
          <button
            onClick={() => {
              // აქ ატვირთვის ლოგიკა
            }}
            className="p-2 border rounded hover:bg-gray-100"
            title="ფაილის ატვირთვა"
          >
            <MdFileUpload size={20} />
          </button>

          {/* Refresh */}
          <button
            onClick={() => {
              // გვერდის გადატვირთვა ან Refetch ლოგიკა
            }}
            className="p-2 border rounded hover:bg-gray-100"
            title="განახლება"
          >
            <MdRefresh size={20} />
          </button>

          {/* Report */}
          <button
            onClick={() => {
              // რეპორტის გენერაცია ან გადმოწერის ლოგიკა
            }}
            className="p-2 border rounded hover:bg-gray-100"
            title="რეპორტი"
          >
            <MdOutlineSummarize size={20} />
          </button>
        </div>
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

export default Inbox;
