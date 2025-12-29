import api from "../lib/api";
import type { Deal, PagedResponse } from "../types/Deal";

export interface DealQueryParams {
  dealStatuses?: string | string[];
  pageNumber?: number;
  pageSize?: number;
  amountFrom?: number;
  amountTo?: number;
  channels?: string[];
  createdByExternalIds?: string[];
  dateFrom?: string;
  dateTo?: string;
  departmentIds?: number[];
  ownerExternalIds?: string[];
  ownerGroupIds?: string[];
  productCodes?: string[];
  progressStatuses?: string[];
  progressSubStatuses?: string[];
  salaryFrom?: number;
  salaryTo?: number;
  searchText?: string;
}

export const getDeals = async (
  params: DealQueryParams
): Promise<PagedResponse<Deal>> => {
  const response = await api.get<PagedResponse<Deal>>("/api/deals", {
    params,
  });

  return response.data;
};
