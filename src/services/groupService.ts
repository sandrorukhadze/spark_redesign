import api from "../lib/api";

export interface Group {
  id: string;
  name: string;
  description: string;
  isAssignable: boolean;
  assignable: boolean;
}

export const fetchGroups = async (
  searchText: string = ""
): Promise<Group[]> => {
  const response = await api.get("/api/groups", {
    params: { searchText },
  });
  return response.data;
};
