import { useState } from "react";
import Button from "../Button";
import { useCreateGroup } from "../../hooks/useCreateGroup";
import { useUpdateGroup } from "../../hooks/useUpdateGroup";

type CreateGroupFormProps = {
  mode: "create" | "edit";
  groupId?: string; // საჭიროა edit-ზე
  initialValues?: {
    name: string;
    description?: string;
  };
  onSuccess?: () => void;
};

const CreateGroupForm = ({
  mode,
  groupId,
  initialValues,
  onSuccess,
}: CreateGroupFormProps) => {
  const [form, setForm] = useState(() => ({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
  }));

  const { mutate: createGroup, isPending: isCreating } = useCreateGroup();
  const { mutate: updateGroup, isPending: isUpdating } = useUpdateGroup();

  const isPending = isCreating || isUpdating;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      createGroup(
        {
          name: form.name,
          description: form.description,
          isAssignable: true,
        },
        {
          onSuccess: () => {
            onSuccess?.();
            setForm({ name: "", description: "" });
          },
        }
      );
    }

    if (mode === "edit" && groupId) {
      updateGroup(
        {
          groupId,
          payload: {
            name: form.name,
            description: form.description,
            isAssignable: true, // ✅ აუცილებელია backend-ისთვის
          },
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">ჯგუფის სახელი</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">აღწერა</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "შენახვა..." : "შენახვა"}
        </Button>
      </div>
    </form>
  );
};

export default CreateGroupForm;
