import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignGroupUser } from "../services/groupAssignUser.service";

export const useAssignGroupUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignGroupUser,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["group-users", variables.groupId],
      });
    },
  });
};
