import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "../../types";
import { X } from "lucide-react";

const schema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  type: z.enum(["residential", "commercial"]),
  units: z.coerce.number().int().min(1),
  rentAmount: z.coerce.number().min(0),
  status: z.enum(["occupied", "vacant", "maintenance"]),
  imageUrl: z.string().url().optional().or(z.literal("")),
  description: z.string().optional(),
  amenities: z.string().optional(), // comma-separated input
});

interface PropertyModalProps {
  mode: "create" | "edit";
  initial?: Property;
  onSubmit: (values: Omit<Property, "id" | "createdAt">) => void;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
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
    defaultValues: initial
      ? {
          name: initial.name,
          address: initial.address,
          type: initial.type,
          units: initial.units,
          rentAmount: initial.rentAmount,
          status: initial.status,
          imageUrl: initial.imageUrl || "",
          description: initial.description || "",
          amenities: initial.amenities?.join(", ") || "",
        }
      : {
          name: "",
          address: "",
          type: "residential",
          units: 1,
          rentAmount: 0,
          status: "vacant",
          imageUrl: "",
          description: "",
          amenities: "",
        },
  });

  const submit = (v: any) => {
    console.log("submitting", v);
    onSubmit({
      name: String(v.name),
      address: String(v.address),
      type: v.type,
      units: Number(v.units),
      rentAmount: Number(v.rentAmount),
      status: v.status,
      imageUrl: v.imageUrl ? String(v.imageUrl) : undefined,
      description: v.description ? String(v.description) : undefined,
      amenities: v.amenities
        ? String(v.amenities)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    });
    console.log("After on sub");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-5 max-h-[80vh] overflow-y-auto relative"
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
          {mode === "create" ? "Add Property" : "Edit Property"}
        </h3>
        <form
          onSubmit={handleSubmit(submit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input className="input-field" {...register("name")} />
            {(errors as any)?.name && (
              <p className="text-danger-600 text-xs mt-1">
                {String((errors as any).name?.message)}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input className="input-field" {...register("address")} />
            {(errors as any)?.address && (
              <p className="text-danger-600 text-xs mt-1">
                {String((errors as any).address?.message)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="select-field" {...register("type")}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select className="select-field" {...register("status")}>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Units
            </label>
            <input
              type="number"
              className="input-field"
              {...register("units")}
            />
            {(errors as any)?.units && (
              <p className="text-danger-600 text-xs mt-1">
                {String((errors as any).units?.message)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Rent (KSh)
            </label>
            <input
              type="number"
              className="input-field"
              {...register("rentAmount")}
            />
            {(errors as any)?.rentAmount && (
              <p className="text-danger-600 text-xs mt-1">
                {String((errors as any).rentAmount?.message)}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input className="input-field" {...register("imageUrl")} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amenities (comma-separated)
            </label>
            <input
              className="input-field"
              placeholder="Parking, Security, Gym"
              {...register("amenities")}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="input-field"
              rows={3}
              {...register("description")}
            />
          </div>
          <div className="md:col-span-2 flex justify-end space-x-2 pt-1">
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
                ? "Create"
                : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
