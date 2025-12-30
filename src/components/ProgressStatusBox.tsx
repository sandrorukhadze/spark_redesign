import React from "react";
import { useSingleDeal } from "../hooks/useSingleDeal";

interface Props {
  dealId: string;
}

const ALL_PROGRESS_STATUSES = [
  { code: "CLIENTS_IN_PROGRESS", label: "Clients in Progress" },
  { code: "CLIENTS_TO_CALL", label: "Clients to Call" },
  { code: "LOAN_APPLICATION_LIST", label: "Loan Application List" },
  { code: "LOAN_IN_PROGRESS", label: "Loan in Progress" },
  { code: "LOAN_DECISION_STATUS", label: "Loan Decision Status" },
  { code: "LOAN_RESULT", label: "Loan Result" },
];

const ProgressStatusBox: React.FC<Props> = ({ dealId }) => {
  const { data, isLoading, error } = useSingleDeal(dealId);

  if (isLoading) return <div>Loading progress status...</div>;
  if (error) return <div>Failed to load progress status.</div>;

  const currentStatus = data?.deal?.progressStatus?.status;

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto text-sm text-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        📊 პროგრესის სტატუსები
      </h2>

      <ul className="space-y-2">
        {ALL_PROGRESS_STATUSES.map((status) => {
          const isActive = status.code === currentStatus;

          return (
            <li
              key={status.code}
              className={`p-3 rounded border text-sm transition ${
                isActive
                  ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
                  : "bg-gray-50 border-gray-200 text-gray-600"
              }`}
            >
              {status.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProgressStatusBox;
