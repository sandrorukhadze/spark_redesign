import { useState } from "react";
import type { Currency } from "../Dropdowns/CurrencyDropdown";
import CurrencyDropdown from "../Dropdowns/CurrencyDropdown";
import ProductsDropdown from "../Dropdowns/ProductsDropdown";
import RequestChannelDropdown from "../Dropdowns/RequestChannelDropdown";
import type { CommunicationMethodId } from "../../constants/CommunicationMethods";
import Button from "../Button";
import { useCreateDeal } from "../../hooks/useCreateDeal";

type CreateLeadFormProps = {
  onSuccess?: () => void;
};

const CreateLeadForm = ({ onSuccess }: CreateLeadFormProps) => {
  const [form, setForm] = useState<{
    fullName: string;
    personalId: string;
    phone: string;
    amount: string;
    currency: Currency;
    productCode: string; // ✅ ერთჯერადი პროდუქტის კოდი
    requestChannel: CommunicationMethodId;
  }>({
    fullName: "",
    personalId: "",
    phone: "",
    amount: "",
    currency: "GEL",
    productCode: "", // ✅ default ცარიელი
    requestChannel: "CALL",
  });

  const { mutate } = useCreateDeal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.fullName,
      personalId: form.personalId,
      mobilePhone: form.phone,
      product: form.productCode, // ✅ იგზავნება როგორც `product`
      amount: Number(form.amount),
      ccy: form.currency,
      channel: form.requestChannel,
    };

    mutate(payload, {
      onSuccess: () => {
        console.log("🟢 Deal created:", payload);
        onSuccess?.();
      },
      onError: (error) => {
        console.error("🔴 Error creating deal:", error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* სახელი გვარი */}
      <div>
        <label className="block text-sm font-medium mb-1">სახელი გვარი</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* პირადი ნომერი */}
      <div>
        <label className="block text-sm font-medium mb-1">პირადი ნომერი</label>
        <input
          type="text"
          name="personalId"
          value={form.personalId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* ტელეფონის ნომერი */}
      <div>
        <label className="block text-sm font-medium mb-1">
          ტელეფონის ნომერი
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* თანხა + ვალუტა */}
      <div>
        <label className="block text-sm font-medium mb-1">
          თანხა და ვალუტა
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="თანხა"
          />

          <div className="w-32">
            <CurrencyDropdown
              value={form.currency}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, currency: value }))
              }
            />
          </div>
        </div>
      </div>

      {/* პროდუქტი (single-select) */}
      <div>
        <label className="block text-sm font-medium mb-1">პროდუქტი</label>
        <ProductsDropdown
          value={form.productCode}
          onChange={(val) =>
            setForm((prev) => ({
              ...prev,
              productCode: val as string,
            }))
          }
        />
      </div>

      {/* მოთხოვნის არხი */}
      <div>
        <label className="block text-sm font-medium mb-1">მოთხოვნის არხი</label>
        <RequestChannelDropdown
          value={form.requestChannel}
          onChange={(val) =>
            setForm((prev) => ({ ...prev, requestChannel: val }))
          }
        />
      </div>

      {/* Submit ღილაკი */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary">
          შენახვა
        </Button>
      </div>
    </form>
  );
};

export default CreateLeadForm;
