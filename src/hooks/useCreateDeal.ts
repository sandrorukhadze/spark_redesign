import { useMutation } from "@tanstack/react-query";
import { createDeal, type CreateDealInput } from "../services/dealPostService";

export const useCreateDeal = () => {
  return useMutation({
    mutationFn: (payload: CreateDealInput) => createDeal(payload),
  });
};
