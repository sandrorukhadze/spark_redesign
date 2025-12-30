import React from "react";
import { useSingleDeal } from "../hooks/useSingleDeal";

const SingleDeal: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = useSingleDeal(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load deal.</div>;
  if (!data) return <div>No data found.</div>;

  const { deal } = data;

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto text-sm text-gray-800 space-y-2">
      <h1 className="text-xl font-bold text-gray-900 mb-4">📄 Deal Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        <p>
          <span className="text-gray-500">ID:</span> {deal.id}
        </p>
        <p>
          <span className="text-gray-500">Name:</span> {deal.name}
        </p>
        <p>
          <span className="text-gray-500">Personal ID:</span> {deal.personalId}
        </p>
        <p>
          <span className="text-gray-500">Department ID:</span>{" "}
          {deal.departmentId}
        </p>
        <p>
          <span className="text-gray-500">Phone:</span> {deal.mobilePhone}
        </p>
        <p>
          <span className="text-gray-500">Mobile Phone:</span>{" "}
          {deal.mobilePhone}
        </p>
        <p>
          <span className="text-gray-500">Channel:</span> {deal.channel}
        </p>
        <p>
          <span className="text-gray-500">Product:</span> {deal.product}
        </p>
        <p>
          <span className="text-gray-500">Amount:</span>{" "}
          {deal.amount.toLocaleString()} {deal.ccy}
        </p>
        <p>
          <span className="text-gray-500">Currency:</span> {deal.ccy}
        </p>
        <p>
          <span className="text-gray-500">Salary:</span>{" "}
          {deal.salary ? `${deal.salary.toLocaleString()} ${deal.ccy}` : "—"}
        </p>
        <p>
          <span className="text-gray-500">Created:</span>{" "}
          {new Date(deal.createDate).toLocaleString()}
        </p>
        <p>
          <span className="text-gray-500">Full Name:</span>{" "}
          {deal.owner?.fullName}
        </p>
        <p>
          <span className="text-gray-500">Status:</span>{" "}
          {deal.progressStatus?.status}
        </p>
        <p>
          <span className="text-gray-500">Assignable:</span>{" "}
          {deal.assignable ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default SingleDeal;
