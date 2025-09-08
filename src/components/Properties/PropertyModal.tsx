import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "../../types";
import { X } from "lucide-react";
import { uploadFileToCloudinary } from "../../utils/file";

const schema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  type: z.enum(["residential", "commercial"]),
  units: z.coerce.number().int().min(1),
  rentAmount: z.coerce.number().min(0),
  status: z.enum(["occupied", "vacant", "maintenance"]),
  imageUrls: z.array(z.string().url()).optional(),
  imageFiles: z.any().optional(), // multiple files
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
    watch,
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
          imageUrls: initial.imageUrls || [],
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
          imageUrls: [],
          description: "",
          amenities: "",
        },
  });

  const selectedFiles = watch("imageFiles") as FileList | undefined;

  const submit = async (v: any) => {
    let uploadedUrls: string[] = [];

    const files: File[] = v.imageFiles ? Array.from(v.imageFiles) : [];
    if (files.length > 0) {
      try {
        uploadedUrls = await Promise.all(
          files.map((file) => uploadFileToCloudinary(file, "propertyImages"))
        );
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }

    onSubmit({
      name: String(v.name),
      address: String(v.address),
      type: v.type,
      units: Number(v.units),
      rentAmount: Number(v.rentAmount),
      status: v.status,
      imageUrls:
        uploadedUrls.length > 0
          ? uploadedUrls
          : v.imageUrls && v.imageUrls.length > 0
          ? v.imageUrls
          : [],
      description: v.description ? String(v.description) : undefined,
      floorPlanUrl: v.floorPlanUrl ? String(v.floorPlanUrl) : undefined,
      amenities: v.amenities
        ? String(v.amenities)
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [],
    });
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
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input className="input-field" {...register("name")} />
            {errors.name && (
              <p className="text-danger-600 text-xs mt-1">
                {String(errors.name?.message)}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input className="input-field" {...register("address")} />
            {errors.address && (
              <p className="text-danger-600 text-xs mt-1">
                {String(errors.address?.message)}
              </p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="select-field" {...register("type")}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Status */}
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

          {/* Units */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Units
            </label>
            <input
              type="number"
              className="input-field"
              {...register("units")}
            />
            {errors.units && (
              <p className="text-danger-600 text-xs mt-1">
                {String(errors.units?.message)}
              </p>
            )}
          </div>

          {/* Rent Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Rent (KSh)
            </label>
            <input
              type="number"
              className="input-field"
              {...register("rentAmount")}
            />
            {errors.rentAmount && (
              <p className="text-danger-600 text-xs mt-1">
                {String(errors.rentAmount?.message)}
              </p>
            )}
          </div>

          {/* Multiple Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("imageFiles")}
            />

            {/* Existing images */}
            {initial?.imageUrls && initial.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {initial.imageUrls.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Property ${i}`}
                    className="rounded-lg max-h-32 object-cover border"
                  />
                ))}
              </div>
            )}

            {/* Preview newly selected images */}
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from(selectedFiles).map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i}`}
                    className="rounded-lg max-h-32 object-cover border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
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

          {/* Description */}
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

          {/* Buttons */}
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
