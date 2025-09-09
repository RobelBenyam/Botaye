import React, { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Wrench,
  DollarSign,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Property, Tenant, Payment, MaintenanceRequest } from "./../../types";
import { readAllDocuments } from "./../../utils/db";

interface Activity {
  id: string;
  type: "payment" | "maintenance" | "lease" | "tenant";
  title: string;
  description: string;
  timestamp: Date;
  status?: "success" | "warning" | "error";
  amount?: number;
}

interface RecentActivityProps {
  properties: Property[];
  maintenanceRequests: MaintenanceRequest[];
  payments: Payment[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  properties,
  maintenanceRequests,
  payments,
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  // const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    const fetchTenantsAndGenerateActivities = async () => {
      try {
        const rawTenants = await readAllDocuments("tenants");
        const fetchedTenants: Tenant[] = rawTenants.map((t: any) => ({
          id: t.id,
          firstName: t.firstName || "",
          lastName: t.lastName || "",
          email: t.email || "",
          phone: t.phone || "",
          leaseStart: t.leaseStart || "",
          leaseEnd: t.leaseEnd || "",
          propertyId: t.propertyId || "",
          rentAmount: t.rentAmount || 0,
          status: t.status || "",
          createdAt: t.createdAt || "",
          depositAmount: t.depositAmount || 0,
          emergencyContact: t.emergencyContact || "",
        }));
        // setTenants(fetchedTenants);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const acts: Activity[] = [];

        payments.forEach((p) => {
          const paidDate = p.paidDate
            ? new Date(p.paidDate)
            : new Date(p.dueDate);
          if (paidDate >= oneWeekAgo) {
            const tenant = fetchedTenants.find((t) => t.id === p.tenantId);
            const property = properties.find((pr) => pr.id === p.propertyId);
            acts.push({
              id: p.id,
              type: "payment",
              title:
                p.status === "pending"
                  ? "Payment Overdue"
                  : "Rent Payment Received",
              description: `${tenant?.firstName || "Tenant"} ${
                tenant?.lastName || ""
              } - ${property?.name || "Property"}`,
              timestamp: paidDate,
              status:
                p.status === "completed"
                  ? "success"
                  : p.status === "pending"
                  ? "error"
                  : "warning",
              amount: p.amount,
            });
          }
        });

        maintenanceRequests.forEach((m) => {
          const createdAt = new Date(m.createdAt);
          if (createdAt >= oneWeekAgo) {
            const property = properties.find((pr) => pr.id === m.propertyId);
            acts.push({
              id: m.id,
              type: "maintenance",
              title: "Maintenance Request Created",
              description: `${m.title} - ${property?.name || "Property"}`,
              timestamp: createdAt,
              status: m.status === "completed" ? "success" : "warning",
            });
          }
        });

        properties.forEach((prop) => {
          const createdAt = new Date(prop.createdAt);
          if (createdAt >= oneWeekAgo) {
            acts.push({
              id: `${prop.id}-lease`,
              type: "lease",
              title: "Property Update",
              description: `Property ${prop.name} status: ${prop.status}`,
              timestamp: createdAt,
            });
          }
        });

        // Sort descending
        acts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        setActivities(acts);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    fetchTenantsAndGenerateActivities();
  }, [properties, maintenanceRequests, payments]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "payment":
        return DollarSign;
      case "maintenance":
        return Wrench;
      case "lease":
        return Calendar;
      case "tenant":
        return User;
      default:
        return AlertCircle;
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "success":
        return {
          bg: "bg-success-500",
          text: "text-success-700",
          ring: "ring-success-100",
        };
      case "warning":
        return {
          bg: "bg-warning-500",
          text: "text-warning-700",
          ring: "ring-warning-100",
        };
      case "error":
        return {
          bg: "bg-danger-500",
          text: "text-danger-700",
          ring: "ring-danger-100",
        };
      default:
        return {
          bg: "bg-gray-500",
          text: "text-gray-700",
          ring: "ring-gray-100",
        };
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="card card-enter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-display mb-1">
            Recent Activity
          </h3>
          <p className="text-sm text-gray-600">
            Latest updates across your properties
          </p>
        </div>
        <button className="btn-ghost flex items-center space-x-2 group">
          <span>View All</span>
          <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const style = getStatusStyle(activity.status);

          return (
            <div key={activity.id} className="activity-item group">
              <div
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft ${style.ring} ring-4`}
              >
                <div
                  className={`w-8 h-8 ${style.bg} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {activity.description}
                    </p>
                    {activity.amount && (
                      <p className="text-sm font-bold text-primary-600 mt-1">
                        ${activity.amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {formatTime(activity.timestamp)}
                    </span>
                    {activity.status && (
                      <div
                        className={`mt-1 inline-block w-2 h-2 ${style.bg} rounded-full`}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span>Live updates enabled</span>
        </div>
      </div>
    </div>
  );
};
