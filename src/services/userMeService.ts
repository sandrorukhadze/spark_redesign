import api from "../lib/api";

export interface UserMeResponse {
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
}

export const getUserMe = async (): Promise<UserMeResponse> => {
  const response = await api.get<UserMeResponse>("/api/users/me");
  return response.data;
};
