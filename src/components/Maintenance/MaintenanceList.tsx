import React, { useState } from "react";
import {
  Plus,
  Search,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Wrench,
} from "lucide-react";
import { MaintenanceRequest } from "../../types";
import MaintenanceModal, { MaintenanceFormValues } from "./MaintenanceModal";
import { mockProperties, mockTenants } from "../../data/mockData";
import {
  useCreateMaintenanceRequest,
  useMaintenanceRequests,
} from "../../hooks/useMaintenance";

interface MaintenanceListProps {
  requests?: MaintenanceRequest[];
}

export const MaintenanceList: React.FC<MaintenanceListProps> = ({
  requests,
}) => {
  const [modalOpen, setModalOpen] = useState<{
    mode: "create" | "edit";
    initial?: Partial<MaintenanceRequest>;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "open" | "in-progress" | "completed" | "cancelled"
  >("all");
  const [filterPriority, setFilterPriority] = useState<
    "all" | "low" | "medium" | "high" | "urgent"
  >("all");

  const { mutate: createMaintenanceRequest } = useCreateMaintenanceRequest();
  const { data: hookRequests } = useMaintenanceRequests();
  const filteredRequests =
    hookRequests?.filter((request) => {
      const matchesSearch =
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || request.status === filterStatus;
      const matchesPriority =
        filterPriority === "all" || request.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    }) || [];

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find((p) => p.id === propertyId);
    return property?.name || "Unknown Property";
  };

  const getTenantName = (tenantId?: string) => {
    if (!tenantId) return "Property Management";
    const tenant = mockTenants.find((t) => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : "Unknown Tenant";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return AlertCircle;
      case "in-progress":
        return Clock;
      case "completed":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-red-600 bg-red-50";
      case "in-progress":
        return "text-yellow-600 bg-yellow-50";
      case "completed":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const openCreate = () => setModalOpen({ mode: "create" });
  const openEdit = (request: MaintenanceRequest) =>
    setModalOpen({ mode: "edit", initial: request });

  const handleModalSubmit = async (values: MaintenanceFormValues) => {
    try {
      const maintenanceRequest: MaintenanceRequest = {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        description: values.description || "No description provided",
      };
      await createMaintenanceRequest(maintenanceRequest);
      console.log("Maintenance request created successfully");
    } catch (error) {
      console.error("Error creating maintenance request:", error);
    }
    setModalOpen(null);
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
        <h2 className="text-2xl font-bold text-gray-900">
          Maintenance Requests
        </h2>
        <button
          onClick={openCreate}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <div
              key={request.id}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(
                      request.status
                    )}`}
                  >
                    <StatusIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          request.priority
                        )}`}
                      >
                        {request.priority.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{request.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>{getPropertyName(request.propertyId)}</span>
                      <span>
                        Reported by: {getTenantName(request.tenantId)}
                      </span>
                      <span>Created: {formatDate(request.createdAt)}</span>
                      {request.assignedTo && (
                        <span>Assigned to: {request.assignedTo}</span>
                      )}
                    </div>

                    {request.actualCost && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-600">
                          Actual Cost: KSh {request.actualCost.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button className="btn-secondary text-sm">View</button>
                  <button
                    onClick={() => openEdit(request)}
                    className="btn-primary text-sm"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <MaintenanceModal
          mode={modalOpen.mode}
          initial={modalOpen.initial}
          onSubmit={handleModalSubmit}
          onClose={() => setModalOpen(null)}
        />
      )}

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Wrench className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No maintenance requests found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};
