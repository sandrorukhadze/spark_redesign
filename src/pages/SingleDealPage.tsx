import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const SingleDeal = lazy(() => import("../components/SingleDeal"));
const SingleLead = lazy(() => import("../components/SingleLead"));
const ProgressStatusBox = lazy(() => import("../components/ProgressStatusBox"));
const ActionBox = lazy(() => import("../components/ActionBox"));
const ActivitiesBox = lazy(() => import("../components/ActivitiesBox"));
const ConsentsBox = lazy(() => import("../components/ConsentsBox"));

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
      <Suspense fallback={<div>Loading Progress Status...</div>}>
        <ProgressStatusBox dealId={id} />
      </Suspense>

      <Suspense fallback={<div>Loading Deal...</div>}>
        <SingleDeal id={id} />
      </Suspense>

      <Suspense fallback={<div>Loading Actions...</div>}>
        <ActionBox />
      </Suspense>

      <Suspense fallback={<div>Loading Consents...</div>}>
        <ConsentsBox dealId={id} />
      </Suspense>

      <Suspense fallback={<div>Loading Activities...</div>}>
        <ActivitiesBox dealId={id} />
      </Suspense>

      <Suspense fallback={<div>Loading Lead...</div>}>
        <SingleLead id={id} />
      </Suspense>
    </div>
  );
};

export default SingleDealPage;
