import api from "../lib/api";

export type UpdateGroupPayload = {
  name: string;
  description?: string;
  isAssignable: boolean; // ✅ დაამატე
};

export const updateGroup = async (
  groupId: string,
  payload: UpdateGroupPayload
): Promise<void> => {
  await api.put(`/api/groups/${groupId}`, payload);
};
