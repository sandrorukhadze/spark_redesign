import React from "react";

export type Currency = "GEL" | "USD" | "EUR";

type Props = {
  value: Currency;
  onChange: (value: Currency) => void;
};

const currencies: Currency[] = ["GEL", "USD", "EUR"];

const CurrencyDropdown: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        const selected = e.target.value as Currency;
        if (currencies.includes(selected)) {
          onChange(selected);
        }
      }}
      className="border rounded px-3 py-2 w-full"
    >
      {currencies.map((cur) => (
        <option key={cur} value={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
};

export default CurrencyDropdown;
