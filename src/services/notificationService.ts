import api from "../lib/api";

export type FetchNotificationsParams = {
  pageNumber?: number;
  pageSize?: number;
  isRead?: boolean;
  isFlagged?: boolean;
  statuses?: string[];
  toUserExternalId?: string;
};

export type Notification = {
  id: number;
  title: string;
  isRead: boolean;
  isFlagged: boolean;
  createdAt: string;
  status: "ACTIVE" | "INACTIVE";
};

export type NotificationsResponse = {
  content: Notification[];
  totalElements: number;
  totalPages: number;
};

export type NotificationMessageParameter = {
  id: number;
  key: string;
  type: string;
  value: string;
};

export type NotificationMessage = {
  id: number;
  order: number;
  messageText: string;
  parameters: NotificationMessageParameter[];
};

export type NotificationDetailResponse = {
  notification: {
    id: number;
    title: string;
    isRead: boolean;
    isFlagged: boolean;
    createdAt: string;
    status: string;
  };
  messages: NotificationMessage[];
};

export const fetchNotifications = async (): Promise<NotificationsResponse> => {
  const { data } = await api.get<NotificationsResponse>("/api/notifications");

  return data;
};

export const fetchNotificationDetail = async (
  id: number
): Promise<NotificationDetailResponse> => {
  const { data } = await api.get(`/api/notifications/${id}`);
  return data;
};
