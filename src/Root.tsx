import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { SignIn } from "./components/Auth/SignIn";
import { ResetPassword } from "./components/Auth/ResetPassword";
import { SignUp } from "./components/Auth/SignUp";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
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
