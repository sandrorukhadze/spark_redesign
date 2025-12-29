import { useQuery } from "@tanstack/react-query";
import { getDeals, type DealQueryParams } from "../services/dealService";
import { type Deal, type PagedResponse } from "../types/Deal";

export const useDeals = (
  params: DealQueryParams,
  options?: { enabled?: boolean }
) => {
  return useQuery<PagedResponse<Deal>>({
    queryKey: ["deals", params],
    queryFn: () => getDeals(params),
    enabled: options?.enabled ?? true,
  });
};
