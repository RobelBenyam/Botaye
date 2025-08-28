import React, { useState } from "react";
import {
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
} from "lucide-react";
import { Tenant } from "../../types";
import { mockProperties } from "../../data/mockData";
import { TenantModal } from "./TenantModal";
import { useToast } from "../Toast/ToastProvider";
import {
  useCreateTenant,
  useTenants,
  useUpdateTenant,
} from "../../hooks/useTenants";

interface TenantListProps {
  tenants: Tenant[];
}

export const TenantList: React.FC<TenantListProps> = ({ tenants }) => {
  console.log("Tesnats ", tenants);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToast } = useToast();

  const updateTenant = useUpdateTenant();

  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "pending" | "expired"
  >("all");

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || tenant.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const createTenant = useCreateTenant();

  const [modalOpen, setModalOpen] = useState<
    null | { mode: "create" } | { mode: "edit"; tenant: Tenant }
  >(null);

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find((p) => p.id === propertyId);
    return property?.name || "Unknown Property";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tenants</h2>
        <button
          className="btn-primary flex items-center space-x-2"
          onClick={() => setModalOpen({ mode: "create" })}
        >
          <Plus className="w-4 h-4" />
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => (
          <div
            key={tenant.id}
            className="card hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tenant.firstName} {tenant.lastName}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      tenant.status
                    )}`}
                  >
                    {tenant.status.charAt(0).toUpperCase() +
                      tenant.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">{tenant.email}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">{tenant.phone}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="text-sm">
                  {getPropertyName(tenant.propertyId)}
                  {tenant.unitNumber && ` - Unit ${tenant.unitNumber}`}
                </span>
              </div>

              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-3" />
                <span className="text-sm">
                  {formatDate(tenant.leaseStart)} -{" "}
                  {formatDate(tenant.leaseEnd)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Rent</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${tenant.rentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm">View</button>
                  <button
                    className="btn-primary text-sm"
                    onClick={() => setModalOpen({ mode: "edit", tenant })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <User className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tenants found
          </h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
      {modalOpen && (
        <TenantModal
          mode={modalOpen.mode}
          initial={modalOpen.mode === "edit" ? modalOpen.tenant : undefined}
          onClose={() => setModalOpen(null)}
          onSubmit={(values) => {
            if (modalOpen.mode === "create") {
              // values already match required shape minus id/createdAt; repo sets createdAt
              // We cast createdAt out in repo
              // @ts-ignore
              createTenant.mutate(values, {
                onSuccess: () => addToast("Tenant data created", "success"),
                onError: () =>
                  addToast("Failed to create Tenant data", "error"),
              });
            } else {
              updateTenant.mutate(
                { id: modalOpen.tenant.id, data: values as any },
                {
                  onSuccess: () => addToast("Tenant updated", "success"),
                  onError: () => addToast("Failed to update tenant", "error"),
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
