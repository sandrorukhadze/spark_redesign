import { useQuery } from "@tanstack/react-query";
import { getUserMe, type UserMeResponse } from "../services/userMeService";

export const useUserMe = () => {
  return useQuery<UserMeResponse>({
    queryKey: ["user", "me"],
    queryFn: getUserMe,
  });
};
