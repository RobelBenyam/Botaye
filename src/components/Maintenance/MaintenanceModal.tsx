import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaintenanceRequest } from "../../types";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  propertyId: z.string().min(1, "Property is required"),
  tenantId: z.string().optional(),
  status: z.enum(["open", "in-progress", "completed", "cancelled"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.enum([
    "plumbing",
    "electrical",
    "hvac",
    "appliance",
    "structural",
    "other",
  ]),
  estimatedCost: z.number().optional(),
  actualCost: z.number().optional(),
});

export type MaintenanceFormValues = z.infer<typeof schema>;

interface Props {
  mode: "create" | "edit";
  initial?: Partial<MaintenanceRequest>;
  onSubmit: (values: MaintenanceFormValues) => Promise<void> | void;
  onClose: () => void;
}

const MaintenanceModal: React.FC<Props> = ({
  mode,
  initial,
  onSubmit,
  onClose,
}) => {
  const { register, handleSubmit, formState } = useForm<MaintenanceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title || "",
      description: initial?.description || "",
      propertyId: initial?.propertyId || "",
      tenantId: initial?.tenantId || "",
      status: (initial?.status as any) || "open",
      priority: (initial?.priority as any) || "low",
      category: (initial?.category as any) || "other",
      estimatedCost: initial?.estimatedCost,
      actualCost: initial?.actualCost,
    },
  });

  const submit = async (values: MaintenanceFormValues) => {
    await onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {mode === "create"
              ? "New Maintenance Request"
              : "Edit Maintenance Request"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title")}
              className="mt-1 block w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property ID
              </label>
              <input
                {...register("propertyId")}
                className="mt-1 block w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tenant ID
              </label>
              <input
                {...register("tenantId")}
                className="mt-1 block w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("status")}
                className="mt-1 block w-full border px-3 py-2 rounded"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                {...register("priority")}
                className="mt-1 block w-full border px-3 py-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category")}
                className="mt-1 block w-full border px-3 py-2 rounded"
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC</option>
                <option value="appliance">Appliance</option>
                <option value="structural">Structural</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estimated Cost
              </label>
              <input
                type="number"
                step="0.01"
                {...register("estimatedCost", { valueAsNumber: true })}
                className="mt-1 block w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Actual Cost
              </label>
              <input
                type="number"
                step="0.01"
                {...register("actualCost", { valueAsNumber: true })}
                className="mt-1 block w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={formState.isSubmitting}
            >
              {mode === "create" ? "Create" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceModal;
