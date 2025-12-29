import api from "../lib/api";

export type GroupUser = {
  externalId: string;
  groupId: string;
  groupName: string;
  departmentId: number;
  managedDepartmentIds: number[];
  name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  shortName: string;
  email: string;
  isAssignable: boolean;
  status: "ACTIVE" | "INACTIVE";
  assignable: boolean;
};

export type GroupUserStatus = "ACTIVE" | "DEACTIVATED";

export const getGroupUsers = async (
  groupId: string,
  searchText?: string
): Promise<GroupUser[]> => {
  const { data } = await api.get<GroupUser[]>(`/api/groups/${groupId}/users`, {
    params: {
      searchText,
    },
  });

  return data;
};
