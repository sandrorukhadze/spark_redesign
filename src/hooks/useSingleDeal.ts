import { useQuery } from "@tanstack/react-query";
import {
  getSingleDeal,
  type DealResponse,
} from "../services/singleDealService";

export const useSingleDeal = (id: string) => {
  return useQuery<DealResponse>({
    queryKey: ["single-deal", id],
    queryFn: () => getSingleDeal(id),
    enabled: !!id,
  });
};
