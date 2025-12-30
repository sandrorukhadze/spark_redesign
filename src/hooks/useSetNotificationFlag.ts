import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setNotificationFlagStatus } from "../services/notificationFlag.service";

type Payload = {
  id: number;
  isFlagged: boolean;
};

export const useSetNotificationFlag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isFlagged }: Payload) =>
      setNotificationFlagStatus(id, isFlagged),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
};
