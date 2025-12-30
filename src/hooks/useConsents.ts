import { useQuery } from "@tanstack/react-query";
import { getConsentsByDealId, type Consent } from "../services/consentService";

export const useConsents = (dealId: string) => {
  return useQuery<Consent[]>({
    queryKey: ["deal-consents", dealId],
    queryFn: () => getConsentsByDealId(dealId),
    enabled: !!dealId,
  });
};
