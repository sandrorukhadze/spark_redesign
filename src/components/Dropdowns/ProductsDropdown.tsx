import React from "react";
import Select, { type MultiValue, type SingleValue } from "react-select";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../services/productService";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string | string[]; // single ან multiple მნიშვნელობა
  onChange: (value: string | string[]) => void;
  multi?: boolean;
};

const ProductsDropdown: React.FC<Props> = ({
  value,
  onChange,
  multi = false,
}) => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  const options: Option[] =
    products?.map((product: Product) => ({
      label: product.name,
      value: product.productCode,
    })) ?? [];

  const getValue = () => {
    if (multi && Array.isArray(value)) {
      return options.filter((opt) => value.includes(opt.value));
    }
    if (!multi && typeof value === "string") {
      return options.find((opt) => opt.value === value) || null;
    }
    return null;
  };

  const handleChange = (selected: MultiValue<Option> | SingleValue<Option>) => {
    if (multi) {
      const selectedValues = (selected as MultiValue<Option>).map(
        (opt) => opt.value
      );
      onChange(selectedValues);
    } else {
      onChange((selected as SingleValue<Option>)?.value || "");
    }
  };

  return (
    <Select
      isMulti={multi}
      options={options}
      value={getValue()}
      onChange={handleChange}
      placeholder="აირჩიე პროდუქტი"
      isClearable
      className="w-full"
      classNamePrefix="react-select"
    />
  );
};

export default ProductsDropdown;
