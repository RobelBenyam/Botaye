import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

const schema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  date: z.string().min(1, "Date is required"),
  method: z.enum(["cash", "bank", "mpesa"]),
  propertyId: z.string(),
  tenantId: z.string(),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export interface PaymentModalProps {
  mode: "create" | "edit";
  initial?: {
    amount: number;
    date: string;
    method: "cash" | "bank" | "mpesa";
    propertyId: string;
    tenantId: string;
    reference?: string;
    notes?: string;
  };
  onSubmit: (values: Omit<PaymentModalProps["initial"], "id">) => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  mode,
  initial,
  onSubmit,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || {
      amount: 0,
      date: "",
      propertyId: "",
      tenantId: "",
      method: "cash",
      reference: "",
      notes: "",
    },
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {mode === "create" ? "Add Payment" : "Edit Payment"}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property ID
            </label>
            <input
              className="input-field"
              {...register("propertyId")}
              placeholder="Enter property ID"
            />
            {errors.propertyId && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.propertyId.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant ID
            </label>
            <input
              className="input-field"
              {...register("tenantId")}
              placeholder="Enter tenant ID"
            />
            {errors.tenantId && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.tenantId.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              className="input-field"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input type="date" className="input-field" {...register("date")} />
            {errors.date && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.date.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Method
            </label>
            <select className="select-field" {...register("method")}>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="mpesa">Mpesa</option>
            </select>
            {errors.method && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.method.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference (optional)
            </label>
            <input className="input-field" {...register("reference")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea className="input-field" rows={2} {...register("notes")} />
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                ? "Add Payment"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
