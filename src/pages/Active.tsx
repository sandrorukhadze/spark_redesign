// pages/Active.tsx
import { useParams } from "react-router-dom";
import SingleDeal from "../components/SingleDeal";

const Active = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <SingleDeal id={id || ""} />
    </div>
  );
};

export default Active;
