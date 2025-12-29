export interface UserInfo {
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
  owner: UserInfo;
  createdBy: UserInfo;
  dealStatus: string;
  isReassigned: boolean;
  tags: string[];
  progressStatus: ProgressStatus;
  progressSubStatus: ProgressSubStatus;
  leads: Lead[];
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}
