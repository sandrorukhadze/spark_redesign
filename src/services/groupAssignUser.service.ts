import api from "../lib/api";

export type AssignGroupUserPayload = {
  groupId: string;
  userExternalId: string;
};

export const assignGroupUser = async ({
  groupId,
  userExternalId,
}: AssignGroupUserPayload): Promise<void> => {
  await api.post(`/api/groups/${groupId}/users/assign`, {
    userExternalId,
  });
};
