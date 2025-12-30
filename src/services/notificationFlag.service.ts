import api from "../lib/api";

export const setNotificationFlagStatus = async (
  id: number,
  isFlagged: boolean
): Promise<void> => {
  await api.put(
    `/api/notifications/${id}/flag`,
    isFlagged, // ✅ raw boolean
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
