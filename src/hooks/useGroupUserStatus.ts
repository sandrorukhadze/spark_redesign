import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupUserStatus } from "../services/groupUserStatus";
import type { GroupUserStatus } from "../services/groupUsers.service";

type Variables = {
  userId: string;
  status: GroupUserStatus;
};

export const useGroupUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: Variables) =>
      updateGroupUserStatus(userId, status),

    onSuccess: () => {
      // refresh group users list
      queryClient.invalidateQueries({ queryKey: ["group-users"] });
    },
  });
};
