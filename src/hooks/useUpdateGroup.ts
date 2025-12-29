import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateGroup,
  type UpdateGroupPayload,
} from "../services/groupUpdate.service";

type Variables = {
  groupId: string;
  payload: UpdateGroupPayload;
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, payload }: Variables) =>
      updateGroup(groupId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["group"] });
    },
  });
};
