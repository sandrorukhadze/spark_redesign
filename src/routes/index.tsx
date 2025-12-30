// routes/index.tsx
import { Route, Routes } from "react-router-dom";

// გვერდები
import Inbox from "../pages/Inbox";
import Active from "../pages/Active";
import OnHold from "../pages/OnHold";
import Archive from "../pages/Archive";
import CallCenter from "../pages/CallCenter";
import Groups from "../pages/Groups";
import GroupDetails from "../pages/GroupDetails";
import SingleDealPage from "../pages/SingleDealPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/active" element={<Active />} />
      <Route path="/onhold" element={<OnHold />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/callcenter" element={<CallCenter />} />
      <Route path="/manage/groups" element={<Groups />} />
      <Route path="manage/groups/:id" element={<GroupDetails />} />
      <Route path="/deals/:id" element={<SingleDealPage />} />

      {/* Optional: fallback route */}
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes;
