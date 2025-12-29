import React from "react";
import Select, { type SingleValue } from "react-select";
import {
  CommunicationMethods,
  type CommunicationMethodId,
} from "../../constants/CommunicationMethods";

type Option = {
  label: string;
  value: CommunicationMethodId;
};

type Props = {
  value: CommunicationMethodId;
  onChange: (value: CommunicationMethodId) => void;
};

const options: Option[] = CommunicationMethods.map((method) => ({
  label: method.name,
  value: method.id,
}));

const RequestChannelDropdown: React.FC<Props> = ({ value, onChange }) => {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleChange = (selected: SingleValue<Option>) => {
    if (selected) {
      onChange(selected.value);
    }
  };

  return (
    <Select<Option, false>
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder="აირჩიე არხი"
      isClearable
      className="w-full"
      classNamePrefix="react-select"
    />
  );
};

export default RequestChannelDropdown;
