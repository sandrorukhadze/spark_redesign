import React from "react";
import { useSingleDeal } from "../hooks/useSingleDeal";

interface Props {
  dealId: string;
}

const ActivitiesBox: React.FC<Props> = ({ dealId }) => {
  const { data, isLoading, error } = useSingleDeal(dealId);

  if (isLoading) return <div>Loading activities...</div>;
  if (error) return <div>Failed to load activities</div>;

  const activities = data?.activities ?? [];

  if (activities.length === 0) {
    return (
      <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto text-sm text-gray-600">
        <h2 className="text-lg font-semibold mb-2">📋 აქტივობები</h2>
        <p>აქტივობები არ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto text-sm text-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        📋 აქტივობები
      </h2>

      <ul className="space-y-4">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="border border-gray-200 rounded p-4 bg-gray-50"
          >
            <p>
              <span className="text-gray-500">თარიღი:</span>{" "}
              {new Date(activity.activityDate).toLocaleString()}
            </p>
            <p>
              <span className="text-gray-500">ტიპი:</span>{" "}
              {activity.activityLabel}
            </p>
            <p>
              <span className="text-gray-500">კომენტარი:</span>{" "}
              {activity.comment || "არ არის"}
            </p>

            {activity.attributes?.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-gray-500 font-medium">ატრიბუტები:</p>
                <ul className="ml-4 list-disc text-gray-700">
                  {activity.attributes.map((attr, index) => (
                    <li key={index}>
                      <strong>{attr.key}:</strong> {attr.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesBox;
