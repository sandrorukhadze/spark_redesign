// src/constants/CommunicationMethods.ts
export const CommunicationMethods = [
  {
    id: "CALL",
    name: "ზარი",
  },
  {
    id: "CHAT",
    name: "ონლაინ ჩატი",
  },
  {
    id: "INTERNET_MOBILE_BANK",
    name: "Internet/Mobile Bank მიმოწერა",
  },
  {
    id: "FB_CHAT",
    name: "Facebook ჩატი",
  },
  {
    id: "EMAIL",
    name: "info@basisbank.ge",
  },
  {
    id: "FB_COMMENT",
    name: "Facebook კომენტარები",
  },
  {
    id: "OTHER",
    name: "სხვა",
  },
] as const;

export type CommunicationMethodId = (typeof CommunicationMethods)[number]["id"];
