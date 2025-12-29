import { useQuery } from "@tanstack/react-query";
import { getGroupUsers, type GroupUser } from "../services/groupUsers.service";

type UseGroupUsersParams = {
  groupId: string;
  searchText?: string;
};

export const useGroupUsers = ({ groupId, searchText }: UseGroupUsersParams) => {
  return useQuery<GroupUser[], Error>({
    queryKey: ["group-users", groupId, searchText],
    queryFn: () => getGroupUsers(groupId, searchText),
    enabled: Boolean(groupId),
  });
};
