import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard"); // ✅ Redirect after successful login
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to MedPortal</h2>
        <button
          onClick={() => auth.signinRedirect()}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign in with AWS Cognito
        </button>
      </div>
    </div>
  );
};

export default Login;
