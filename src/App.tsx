import { useEffect, useState } from "react";
import { DashboardStats } from "./components/Dashboard/DashboardStats";
import { RecentActivity } from "./components/Dashboard/RecentActivity";
import { readAllDocuments } from "./utils/db";
import {
  Property,
  MaintenanceRequest,
  Payment,
  DashboardStats as StatsType,
} from "./types";

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

  const stats: StatsType = {
    totalProperties,
    totalUnits,
    occupiedProperties,
    monthlyRevenue,
    maintenanceRequests: totalMaintenanceRequests,
    overduePayments,
  };

  return stats;
};

function App() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [rawPayments, setRawPayments] = useState<any[]>([]);
  const [rawProperties, setaRawProperties] = useState<any[]>([]);
  const [rawMaintenanceRequests, setRawMaintenanceRequests] = useState<any[]>(
    []
  );

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        setaRawProperties(await readAllDocuments("properties"));
        setRawMaintenanceRequests(
          await readAllDocuments("maintenance_requests")
        );
        setRawPayments(await readAllDocuments("payments"));

        const properties: Property[] = rawProperties.map((doc: any) => ({
          id: doc.id,
          name: doc.name ?? "",
          address: doc.address ?? "",
          type: doc.type ?? "",
          units: doc.units ?? 0,
          status: doc.status ?? "",
          rentAmount: doc.rentAmount ?? 0,
          owner: doc.owner ?? "",
          tenants: doc.tenants ?? [],
          payments: doc.payments ?? [],
          floorPlanUrls: doc.floorPlanUrls ?? [],
          amenities: doc.amenities ?? [],
          createdAt: doc.createdAt ?? "",
          createdBy: doc.createdBy ?? "",
        }));

        const maintenanceRequests: MaintenanceRequest[] =
          rawMaintenanceRequests.map((doc: any) => ({
            id: doc.id,
            propertyId: doc.propertyId ?? "",
            title: doc.title ?? "",
            description: doc.description ?? "",
            priority: doc.priority ?? "",
            status: doc.status ?? "",
            createdAt: doc.createdAt ?? "",
            updatedAt: doc.updatedAt ?? "",
            assignedTo: doc.assignedTo ?? "",
            category: doc.category ?? "",
          }));
        const payments: Payment[] = rawPayments.map((doc: any) => ({
          id: doc.id,
          propertyId: doc.propertyId ?? "",
          tenantId: doc.tenantId ?? "",
          amount: doc.amount ?? 0,
          type: doc.type ?? "rent",
          status: doc.status ?? "pending",
          dueDate: doc.dueDate ?? new Date(),
          paidDate: doc.paidDate ? new Date(doc.paidDate) : undefined,
          description: doc.description ?? "",
          method: doc.method ?? "cash",
        }));

        const computedStats = calculateDashboardStats(
          properties,
          maintenanceRequests,
          payments
        );

        setStats(computedStats);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchFromDatabase();
  }, []);

  const rentPayments = rawPayments.filter((p) => p.type === "rent");
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
      {/* Sidebar remains fixed */}
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* Header remains at the top */}
        {/* <Header /> */}
        <main className="flex-1 overflow-auto pt-40 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="page-enter space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold font-display gradient-text mb-3">
                  Welcome Back, Sarah
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
                    properties={rawProperties}
                    maintenanceRequests={rawMaintenanceRequests}
                    payments={rawPayments}
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
