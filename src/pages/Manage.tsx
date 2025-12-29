import { useState } from "react";
import ProductsDropdown from "../components/Dropdowns/ProductsDropdown";

const Manage = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      <ProductsDropdown
        multi
        value={selectedProducts}
        onChange={(val) => setSelectedProducts(val as string[])}
      />

      <div className="mt-4">
        <strong>შერჩეული პროდუქტები:</strong>
        <ul className="list-disc ml-5 mt-2">
          {selectedProducts.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Manage;
