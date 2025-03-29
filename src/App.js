import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Dashboard from "./components/Dashboard";

// Callback component
const Callback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
      {/* Callback Route */}
      <Route path="/auth/callback" element={<Callback />} />

      {/* Login Page */}
      <Route
        path="/"
        element={
          auth.isLoading ? (
            <div>Loading...</div>
          ) : !auth.isAuthenticated ? (
            <div
              className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
              style={{ backgroundImage: "url('/images/login_background.png')" }}
            >
              {/* Dark overlay for contrast 
              <div className="absolute inset-0 bg-black opacity-40"></div>*/}

              {/* Pistachio Neumorphic Card */}
              <div
                className="
                  relative
                  max-w-md
                  mx-auto
                  p-8
                  rounded-xl
                  text-center
                  bg-[#c6e2b1]/80      /* Pistachio color w/ partial transparency */
                  backdrop-blur-md
                  ring-1 ring-white/40
                  shadow-[8px_8px_16px_rgba(0,0,0,0.25),-8px_-8px_16px_rgba(255,255,255,0.8)]
                "
              >
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  Welcome to MedPortal
                </h1>
                <button
                  onClick={() => auth.signinRedirect()}
                  className="
                    mt-4
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    py-2
                    px-6
                    rounded-full
                    shadow
                  "
                >
                  Sign in with AWS Cognito
                </button>
              </div>
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
