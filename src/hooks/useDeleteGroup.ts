import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "../services/groupDelete.service";

type Variables = {
  groupId: string;
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId }: Variables) => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });
};
