import api from "../lib/api";
import type { GroupUserStatus } from "./groupUsers.service";

type UpdateUserStatusPayload = {
  status: GroupUserStatus;
};

export const updateGroupUserStatus = async (
  userId: string,
  status: GroupUserStatus
): Promise<void> => {
  await api.post<UpdateUserStatusPayload>(`/api/users/${userId}/status`, {
    status,
  });
};
