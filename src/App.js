import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Dashboard from "./components/Dashboard";

// Custom Callback component to handle the redirect response.
const Callback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Once authentication is complete, redirect to dashboard.
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth, navigate]);

  return <div>Processing login...</div>;
};

function App() {
  const auth = useAuth();

  return (
    <Routes>
      {/* Callback Route: Processes the authentication response */}
      <Route path="/auth/callback" element={<Callback />} />

      {/* Login Page */}
      <Route
        path="/"
        element={
          auth.isLoading ? (
            <div>Loading...</div>
          ) : !auth.isAuthenticated ? (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
              <h1 className="text-3xl font-bold">Welcome to MedPortal</h1>
              <button
                onClick={() => auth.signinRedirect()}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Sign in with AWS Cognito
              </button>
            </div>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      {/* Dashboard Page */}
      <Route
        path="/dashboard"
        element={auth.isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
