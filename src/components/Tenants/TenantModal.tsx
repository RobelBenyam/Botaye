import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tenant } from "../../types";
import { X } from "lucide-react";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  propertyId: z.string().min(1),
  unitNumber: z.string().optional(),
  leaseStart: z.coerce.date(),
  leaseEnd: z.coerce.date(),
  rentAmount: z.coerce.number().min(0),
  depositAmount: z.coerce.number().min(0),
  status: z.enum(["active", "pending", "expired"]),
  emergencyContact: z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    relationship: z.string().min(2),
  }),
});

interface TenantModalProps {
  mode: "create" | "edit";
  initial?: Tenant;
  onSubmit: (values: Omit<Tenant, "id" | "createdAt">) => void;
  onClose: () => void;
}

export const TenantModal: React.FC<TenantModalProps> = ({
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
          firstName: initial.firstName,
          lastName: initial.lastName,
          email: initial.email,
          phone: initial.phone,
          propertyId: initial.propertyId,
          unitNumber: initial.unitNumber,
          leaseStart: initial.leaseStart
            ? new Date(initial.leaseStart)
            : undefined,
          leaseEnd: initial.leaseEnd ? new Date(initial.leaseEnd) : undefined,
          rentAmount: initial.rentAmount,
          depositAmount: initial.depositAmount,
          status: initial.status,
          emergencyContact: initial.emergencyContact,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          propertyId: "",
          unitNumber: "",
          leaseStart: undefined,
          leaseEnd: undefined,
          rentAmount: 0,
          depositAmount: 0,
          status: "active",
          emergencyContact: {
            name: "",
            phone: "",
            relationship: "",
          },
        },
  });

  const submit = (v: any) => {
    console.log("submitting", v);
    onSubmit({
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      phone: v.phone,
      propertyId: v.propertyId,
      unitNumber: v.unitNumber,
      leaseStart: v.leaseStart,
      leaseEnd: v.leaseEnd,
      rentAmount: Number(v.rentAmount),
      depositAmount: Number(v.depositAmount),
      status: v.status,
      emergencyContact: {
        name: v.emergencyContact?.name,
        phone: v.emergencyContact?.phone,
        relationship: v.emergencyContact?.relationship,
      },
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
          {mode === "create" ? "Add Tenant" : "Edit Tenant"}
        </h3>
        <form
          onSubmit={handleSubmit(submit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input className="input-field" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input className="input-field" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="input-field"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input className="input-field" {...register("phone")} />
            {errors.phone && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property ID
            </label>
            <input className="input-field" {...register("propertyId")} />
            {errors.propertyId && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.propertyId.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Number
            </label>
            <input className="input-field" {...register("unitNumber")} />
            {errors.unitNumber && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.unitNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lease Start
            </label>
            <input
              className="input-field"
              type="date"
              {...register("leaseStart")}
            />
            {errors.leaseStart && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.leaseStart.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lease End
            </label>
            <input
              className="input-field"
              type="date"
              {...register("leaseEnd")}
            />
            {errors.leaseEnd && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.leaseEnd.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rent Amount
            </label>
            <input
              className="input-field"
              type="number"
              step="0.01"
              {...register("rentAmount")}
            />
            {errors.rentAmount && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.rentAmount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deposit Amount
            </label>
            <input
              className="input-field"
              type="number"
              step="0.01"
              {...register("depositAmount")}
            />
            {errors.depositAmount && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.depositAmount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select className="select-field" {...register("status")}>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
            {errors.status && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Name
            </label>
            <input
              className="input-field"
              {...register("emergencyContact.name")}
            />
            {errors.emergencyContact?.name && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.emergencyContact.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Phone
            </label>
            <input
              className="input-field"
              {...register("emergencyContact.phone")}
            />
            {errors.emergencyContact?.phone && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.emergencyContact.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Relationship
            </label>
            <input
              className="input-field"
              {...register("emergencyContact.relationship")}
            />
            {errors.emergencyContact?.relationship && (
              <p className="text-danger-600 text-xs mt-1">
                {errors.emergencyContact.relationship.message}
              </p>
            )}
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
