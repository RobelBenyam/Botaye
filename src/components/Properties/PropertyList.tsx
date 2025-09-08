import React, { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { Property } from "../../types";
import { PropertyCard } from "./PropertyCard";
import { PropertyModal } from "./PropertyModal";
import {
  useCreateProperty,
  useDeleteProperty,
  useUpdateProperty,
} from "../../hooks/useProperties";
import { useToast } from "../Toast/ToastProvider";

interface PropertyListProps {
  properties: Property[];
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "residential" | "commercial"
  >("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "occupied" | "vacant" | "maintenance"
  >("all");
  const [modalOpen, setModalOpen] = useState<
    null | { mode: "create" } | { mode: "edit"; property: Property }
  >(null);
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();
  const { addToast } = useToast();

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || property.type === filterType;
    const matchesStatus =
      filterStatus === "all" || property.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
        <button
          className="btn-primary flex items-center space-x-2"
          onClick={() => setModalOpen({ mode: "create" })}
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onView={(prop) => console.log("View property:", prop)}
            onEdit={(prop) => setModalOpen({ mode: "edit", property: prop })}
            onDelete={(prop) => {
              deleteProperty.mutate(prop.id, {
                onSuccess: () => addToast("Property deleted", "success"),
                onError: () => addToast("Failed to delete property", "error"),
              });
            }}
          />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {modalOpen && (
        <PropertyModal
          mode={modalOpen.mode}
          initial={modalOpen.mode === "edit" ? modalOpen.property : undefined}
          onClose={() => setModalOpen(null)}
          onSubmit={(values) => {
            if (modalOpen.mode === "create") {
              // values already match required shape minus id/createdAt; repo sets createdAt
              // We cast createdAt out in repo
              // @ts-ignore
              createProperty.mutate(values, {
                onSuccess: () => addToast("Property created", "success"),
                onError: () => addToast("Failed to create property", "error"),
              });
            } else {
              updateProperty.mutate(
                { id: modalOpen.property.id, data: values as any },
                {
                  onSuccess: () => addToast("Property updated", "success"),
                  onError: () => addToast("Failed to update property", "error"),
                }
              );
            }
            setModalOpen(null);
          }}
        />
      )}
    </div>
  );
};
