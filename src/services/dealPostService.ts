import api from "../lib/api";

export type CreateDealInput = {
  name: string;
  personalId: string;
  mobilePhone: string;
  product: string;
  amount: number;
  ccy: "GEL" | "USD" | "EUR";
  channel: string;
};

export const createDeal = async (payload: CreateDealInput) => {
  const { data } = await api.post("/api/deals", payload);
  return data;
};
