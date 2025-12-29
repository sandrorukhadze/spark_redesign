import api from "../lib/api";

export interface CreateGroupInput {
  name: string;
  description: string;
  isAssignable: boolean;
}

// API call ფუნქცია
export const createGroup = async (payload: CreateGroupInput) => {
  const response = await api.post("/api/groups", payload);
  return response.data;
};
