import { useQuery } from "@tanstack/react-query";
import { fetchNotificationDetail } from "../services/notificationService";

export const useNotificationDetail = (id?: number) => {
  return useQuery({
    queryKey: ["notification-detail", id],
    queryFn: () => fetchNotificationDetail(id as number),
    enabled: !!id, // ⬅️ მხოლოდ როცა აიდია არსებობს
  });
};