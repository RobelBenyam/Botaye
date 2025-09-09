import { useEffect, useState } from "react";
import { DashboardStats } from "./components/Dashboard/DashboardStats";
import { RecentActivity } from "./components/Dashboard/RecentActivity";
import { useAuth } from "./context/AuthContext";
import {
  Property,
  MaintenanceRequest,
  Payment,
  DashboardStats as StatsType,
} from "./types";
import { useProperties } from "./hooks/useProperties";
import { useMaintenanceRequests } from "./hooks/useMaintenance";
import { usePayments } from "./hooks/usePayments";

const calculateDashboardStats = (
  properties: Property[],
  maintenanceRequests: MaintenanceRequest[],
  payments: Payment[]
) => {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const occupiedProperties = properties.filter(
    (p) => p.status === "occupied"
  ).length;

  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const monthlyRevenue = payments
    .filter(
      (p) =>
        p.status === "completed" &&
        p.paidDate &&
        new Date(p.paidDate) >= thirtyDaysAgo
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const totalMaintenanceRequests = maintenanceRequests.length;
  const overduePayments = payments.filter(
    (p) => p.type === "rent" && p.status === "pending"
  ).length;

  return {
    totalProperties,
    totalUnits,
    occupiedProperties,
    monthlyRevenue,
    maintenanceRequests: totalMaintenanceRequests,
    overduePayments,
  } as StatsType;
};

function App() {
  const { user } = useAuth();

  const { data: properties = [] } = useProperties();
  const { data: maintenanceRequestsRaw = [] } = useMaintenanceRequests();
  const { data: paymentsRaw = [] } = usePayments();

  const propertyIds = properties.map((p) => p.id);
  const maintenanceRequests = maintenanceRequestsRaw.filter((m) =>
    propertyIds.includes(m.propertyId)
  );
  const payments = paymentsRaw.filter((p) =>
    propertyIds.includes(p.propertyId)
  );

  const [stats, setStats] = useState<StatsType | null>(null);

  useEffect(() => {
    const computedStats = calculateDashboardStats(
      properties,
      maintenanceRequests,
      payments
    );
    setStats(computedStats);
  }, [properties, maintenanceRequests, payments]);

  const rentPayments = payments.filter((p) => p.type === "rent");
  const totalRentDue = rentPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalRentCollected = rentPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const collectionRate =
    totalRentDue > 0 ? (totalRentCollected / totalRentDue) * 100 : 0;
  const avgRent =
    stats && stats.occupiedProperties > 0
      ? stats.monthlyRevenue / stats.occupiedProperties
      : 0;
  const occupancyRate = Math.round(
    stats && stats.totalUnits
      ? (stats.occupiedProperties / stats.totalUnits) * 100
      : 0
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto pt-16 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="page-enter space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold font-display gradient-text mb-3">
                  Welcome Back, {user?.name ?? "Guest"}
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  Here's what's happening with your Bottaye properties today
                </p>
              </div>

              <DashboardStats
                stats={{
                  totalProperties: stats?.totalProperties ?? 0,
                  totalUnits: stats?.totalUnits ?? 0,
                  occupiedProperties: stats?.occupiedProperties ?? 0,
                  monthlyRevenue: stats?.monthlyRevenue ?? 0,
                  maintenanceRequests: stats?.maintenanceRequests ?? 0,
                  overduePayments: stats?.overduePayments ?? 0,
                }}
              />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <RecentActivity
                    properties={properties}
                    maintenanceRequests={maintenanceRequests}
                    payments={payments}
                  />
                </div>
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 font-display mb-4">
                      Quick Insights
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary-50 to-transparent rounded-xl">
                        <span className="text-gray-700 font-medium">
                          Occupancy Rate
                        </span>
                        <span className="font-bold text-primary-600">
                          {occupancyRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-success-50 to-transparent rounded-xl">
                        <span className="text-gray-700 font-medium">
                          Avg. Rent
                        </span>
                        <span className="font-bold text-success-600">
                          {Math.round(avgRent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-secondary-50 to-transparent rounded-xl">
                        <span className="text-gray-700 font-medium">
                          Collection Rate
                        </span>
                        <span className="font-bold text-secondary-600">
                          {Math.round(collectionRate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
