import api from "../lib/api";

export const deleteGroup = async (groupId: string): Promise<void> => {
  await api.delete(`/api/groups/${groupId}`);
};
