import React, { useState } from "react";
import AllUsersDropdown from "../components/Dropdowns/allUsersDropdown";

const Active = () => {
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Active Users</h1>

      <div className="max-w-md">
        <AllUsersDropdown
          value={userId}
          onChange={(val) => setUserId(val as string)} // ✅ აქ გამოიყენება
        />
      </div>

      {userId && (
        <p className="text-sm text-gray-600">
          არჩეული მომხმარებლის ID: <b>{userId}</b>
        </p>
      )}
    </div>
  );
};

export default Active;
