import React from "react";
import { useSingleDeal } from "../hooks/useSingleDeal";
import {
  FiUsers,
  FiPhone,
  FiClipboard,
  FiTrendingUp,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

interface Props {
  dealId: string;
}

const ALL_PROGRESS_STATUSES = [
  { code: "CLIENTS_IN_PROGRESS", label: "Clients in Progress", icon: FiUsers },
  { code: "CLIENTS_TO_CALL", label: "Clients to Call", icon: FiPhone },
  {
    code: "LOAN_APPLICATION_LIST",
    label: "Loan Application List",
    icon: FiClipboard,
  },
  { code: "LOAN_IN_PROGRESS", label: "Loan in Progress", icon: FiTrendingUp },
  {
    code: "LOAN_DECISION_STATUS",
    label: "Loan Decision Status",
    icon: FiCheckCircle,
  },
  { code: "LOAN_RESULT", label: "Loan Result", icon: FiAward },
];

const ProgressStatusBox: React.FC<Props> = ({ dealId }) => {
  const { data, isLoading, error } = useSingleDeal(dealId);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading progress status...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to load progress status.
      </div>
    );
  }

  const currentStatus = data?.deal?.progressStatus?.status;
  const currentIndex = ALL_PROGRESS_STATUSES.findIndex(
    (status) => status.code === currentStatus
  );

  return (
    <section
      id="progress-status"
      className="scroll-mt-28 p-6 bg-white rounded-xl shadow max-w-5xl mx-auto text-sm text-gray-800"
    >
      <div className="relative flex justify-between items-start">
        {/* Connecting line behind steps */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        {ALL_PROGRESS_STATUSES.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const Icon = status.icon;

          return (
            <div key={status.code} className="flex-1 text-center relative z-10">
              {/* Circle with icon */}
              <div
                className={`w-11 h-11 mx-auto rounded-full flex items-center justify-center text-lg shadow-sm transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : isCompleted
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
                title={status.label}
              >
                <Icon size={20} />
              </div>

              {/* Label */}
              <div className="mt-2 text-[11px] sm:text-xs text-gray-700 font-medium leading-tight">
                {status.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProgressStatusBox;
