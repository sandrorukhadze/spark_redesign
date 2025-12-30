import React from "react";
import { useParams } from "react-router-dom";

import SingleDeal from "../components/SingleDeal";
import SingleLead from "../components/SingleLead";
import ProgressStatusBox from "../components/ProgressStatusBox";
import ActionBox from "../components/ActionBox";
import ActivitiesBox from "../components/ActivitiesBox";
import ConsentsBox from "../components/ConsentsBox";

const SingleDealPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg font-medium">
        Deal ID not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8">
      <ProgressStatusBox dealId={id} />

      <SingleDeal id={id} />

      <ActionBox />

      <ConsentsBox dealId={id} />

      <ActivitiesBox dealId={id} />

      <SingleLead id={id} />
    </div>
  );
};

export default SingleDealPage;
