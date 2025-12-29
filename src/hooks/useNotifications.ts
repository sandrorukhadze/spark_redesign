import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../services/notificationService";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 1000 * 30,
  });
};
