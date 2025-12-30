import api from "../lib/api";

export interface Consent {
  consentId: string;
  consentCode: string;
  consentDate: string;
  consentLabel: string;
}

export const getConsentsByDealId = async (
  dealId: string
): Promise<Consent[]> => {
  const response = await api.get<Consent[]>(`/api/deals/${dealId}/consents`);
  return response.data;
};
