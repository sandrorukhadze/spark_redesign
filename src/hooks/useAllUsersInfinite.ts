import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/userService";

const PAGE_SIZE = 20;

export const useAllUsersInfinite = (searchText: string) => {
  return useInfiniteQuery({
    queryKey: ["all-users", searchText],

    queryFn: ({ pageParam = 0 }) =>
      getAllUsers({
        pageNumber: pageParam,
        pageSize: PAGE_SIZE,
        searchText,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });
};
