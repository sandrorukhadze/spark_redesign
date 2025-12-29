import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createGroup,
  type CreateGroupInput,
} from "../services/groupPostService";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGroupInput) => createGroup(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};
