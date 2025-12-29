import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unassignGroupUser } from "../services/groupUserUnassign.service";

type Variables = {
  groupId: string;
  userExternalId: string;
};

export const useUnassignGroupUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, userExternalId }: Variables) =>
      unassignGroupUser(groupId, userExternalId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group-users"],
      });
    },
  });
};
