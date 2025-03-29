import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import loginBackground from "../images/login_background.png";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log("Imported image path:", loginBackground); // <-- Check if this is valid

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Card */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome to MedPortal</h2>
        <button
          onClick={() => auth.signinRedirect()}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-full"
        >
          Sign in with AWS Cognito
        </button>
      </div>
    </div>
  );
};

export default Login;
