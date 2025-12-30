import React from "react";
import { useConsents } from "../hooks/useConsents";

interface Props {
  dealId: string;
}

type ConsentCode = "rs" | "mt" | "cig";

const allConsentCodes: ConsentCode[] = ["rs", "mt", "cig"];

const getConsentInfo = (code: ConsentCode, consentDate?: string) => {
  switch (code) {
    case "rs":
      return {
        label: "RS-ის თანხმობა",
        expiry: consentDate ? new Date(consentDate).toLocaleDateString() : "-",
      };
    case "mt":
      return {
        label: "გზავნილის თანხმობა",
        expiry: "-",
      };
    case "cig":
      return {
        label: "კრედიტ-ინფოს თანხმობა",
        expiry: "-",
      };
    default:
      return {
        label: "უცნობი თანხმობა",
        expiry: "-",
      };
  }
};

const ConsentsBox: React.FC<Props> = ({ dealId }) => {
  const { data, isLoading, error } = useConsents(dealId);

  if (isLoading) return <div>Loading consents...</div>;
  if (error) return <div>Failed to load consents.</div>;

  // გაამარტივე წვდომა
  const consentMap = new Map(
    (data ?? []).map((consent) => [consent.consentCode.toLowerCase(), consent])
  );

  return (
    <div className="rounded-xl p-6 bg-white  shadow max-w-3xl mx-auto text-sm text-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        📝 თანხმობები
      </h2>

      <ul className="space-y-4">
        {allConsentCodes.map((code) => {
          const consent = consentMap.get(code);
          const { label, expiry } = getConsentInfo(code, consent?.consentDate);

          return (
            <li
              key={code}
              className="border border-gray-200 rounded p-4 bg-gray-50"
            >
              <p className="text-gray-700 font-medium">{label}</p>
              <p className="text-gray-500 text-sm">
                კოდი: {code.toUpperCase()}
              </p>
              {consent ? (
                <p className="text-gray-500 text-sm">ვადა: {expiry}</p>
              ) : (
                <p className="text-red-500 text-sm">ინფორმაცია არ მოიძებნა</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConsentsBox;
