import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setNotificationReadStatus } from "../services/notificationService";

type Payload = {
  id: number;
  isRead: boolean;
};

export const useSetNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isRead }: Payload) =>
      setNotificationReadStatus(id, isRead),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
