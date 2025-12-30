import React from "react";
import { useSingleDeal } from "../hooks/useSingleDeal";

const SingleLead: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = useSingleDeal(id);

  if (isLoading) return <div>Loading leads...</div>;
  if (error) return <div>Failed to load leads.</div>;
  if (!data || !data.deal.leads.length) return <div>No leads found.</div>;

  const lead = data.deal.leads[0]; // ვიღებთ პირველ ლიდს

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto text-sm text-gray-800 space-y-2 mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">👤 Lead Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        <p>
          <span className="text-gray-500">ID:</span> {lead.id}
        </p>
        <p>
          <span className="text-gray-500">Name:</span> {lead.name}
        </p>
        <p>
          <span className="text-gray-500">Personal ID:</span> {lead.personalId}
        </p>
        <p>
          <span className="text-gray-500">Phone:</span> {lead.mobilePhone}
        </p>
        <p>
          <span className="text-gray-500">Channel:</span> {lead.channel}
        </p>
        <p>
          <span className="text-gray-500">Product:</span> {lead.product}
        </p>
        <p>
          <span className="text-gray-500">Amount:</span>{" "}
          {lead.amount.toLocaleString()} {lead.ccy}
        </p>
        <p>
          <span className="text-gray-500">Salary:</span>{" "}
          {lead.salary ? `${lead.salary.toLocaleString()} ${lead.ccy}` : "—"}
        </p>
        <p>
          <span className="text-gray-500">Created:</span>{" "}
          {new Date(lead.createDate).toLocaleString()}
        </p>
        <p>
          <span className="text-gray-500">Department ID:</span>{" "}
          {lead.departmentId}
        </p>
        <p>
          <span className="text-gray-500">Details:</span> {lead.details}
        </p>
      </div>
    </div>
  );
};

export default SingleLead;
