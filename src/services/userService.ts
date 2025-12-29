import api from "../lib/api";

export type User = {
  externalId: string;
  fullName: string;
};

export type UsersResponse = {
  content: User[];
  totalPages: number;
  totalElements: number;
};

type GetUsersParams = {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
};

export const getAllUsers = async (
  params: GetUsersParams
): Promise<UsersResponse> => {
  const { data } = await api.get("/api/users/all", {
    params,
  });

  return data;
};
