// services/singleDealService.ts
import api from "../lib/api";

// types/deal.ts

export interface DealResponse {
  deal: Deal;
  activities: Activity[];
}

export interface Deal {
  id: string;
  departmentId: number;
  name: string;
  personalId: string;
  mobilePhone: string;
  channel: string;
  product: string;
  amount: number;
  ccy: string;
  salary: number;
  createDate: string;
  owner: User;
  createdBy: User;
  dealStatus: string;
  isReassigned: boolean;
  tags: string[];
  progressStatus: ProgressStatus;
  progressSubStatus: ProgressSubStatus;
  leads: Lead[];
  assignable: boolean;
}

export interface User {
  externalId: string;
  groupId: string;
  groupName: string;
  departmentId: number;
  managedDepartmentIds: number[];
  name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  shortName: string;
  email: string;
  isAssignable: boolean;
  status: string;
  assignable: boolean;
}

export interface ProgressStatus {
  id: number;
  status: string;
  label: string;
  order: number;
}

export interface ProgressSubStatus {
  id: number;
  subStatus: string;
  label: string;
  order: number;
}

export interface Lead {
  id: string;
  departmentId: number;
  name: string;
  personalId: string;
  mobilePhone: string;
  channel: string;
  details: string;
  product: string;
  amount: number;
  ccy: string;
  salary: number;
  createDate: string;
}

export interface Activity {
  id: number;
  activityType: string;
  activityLabel: string;
  activityDate: string;
  comment: string;
  attributes: {
    key: string;
    value: string;
  }[];
}

export const getSingleDeal = async (id: string): Promise<DealResponse> => {
  const response = await api.get<DealResponse>(`/api/deals/${id}`);
  return response.data;
};
