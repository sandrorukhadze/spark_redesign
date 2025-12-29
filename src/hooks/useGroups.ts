import { useQuery } from "@tanstack/react-query";
import { fetchGroups, type Group } from "../services/groupService";

export const useGroups = (searchText: string) => {
  return useQuery<Group[]>({
    queryKey: ["groups", searchText],
    queryFn: () => fetchGroups(searchText),
    staleTime: 1000 * 60 * 5,
  });
};
