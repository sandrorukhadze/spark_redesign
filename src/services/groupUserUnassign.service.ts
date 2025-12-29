import api from "../lib/api";

type UnassignUserPayload = {
  userExternalId: string;
};

export const unassignGroupUser = async (
  groupId: string,
  userExternalId: string
): Promise<void> => {
  await api.post<UnassignUserPayload>(`/api/groups/${groupId}/users/unassign`, {
    userExternalId,
  });
};
