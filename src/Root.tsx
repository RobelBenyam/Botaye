import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { SignIn } from "./components/Auth/SignIn";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { SignUp } from "./components/Auth/SignUp";
import { PropertyList } from "./components/Properties/PropertyList";
import PropertyDetails from "./components/Properties/PropertyDetails";
import { TenantList } from "./components/Tenants/TenantList";
import { MaintenanceList } from "./components/Maintenance/MaintenanceList";
import { PaymentList } from "./components/Payments/PaymentList";
import { LeaseList } from "./components/Leases/LeaseList";
import { ReportsDashboard } from "./components/Reports/ReportsDashboard";
import { SettingsPanel } from "./components/Settings/SettingsPanel";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import App from "./App";

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[auto_1fr] h-screen">
        <Sidebar />
        <main className="pt-40 pl-4 overflow-y-auto min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <App /> },
          { path: "properties", element: <PropertyList /> },
          { path: "properties/:id", element: <PropertyDetails /> },
          { path: "tenants", element: <TenantList /> },
          { path: "leases", element: <LeaseList /> },
          { path: "maintenance", element: <MaintenanceList /> },
          {
            path: "payments",
            element: <PaymentList payments={[]} />,
          },
          { path: "reports", element: <ReportsDashboard /> },
          { path: "settings", element: <SettingsPanel /> },
        ],
      },
    ],
  },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

export const Root: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
