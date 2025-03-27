import { useAuth } from "react-oidc-context";
import Dashboard from "./components/Dashboard";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "7rfb69gglntu7klpdq77i9asau";
    const logoutUri = "http://localhost:3000/";
    const cognitoDomain = "https://us-east-24tftlwzgp.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // **Show loading screen until authentication state is checked**
  if (auth.isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading authentication...</div>;
  }

  // **If authentication fails, show error message**
  if (auth.error) {
    return <div className="text-center mt-10 text-red-500">Error: {auth.error.message}</div>;
  }

  // **If user is NOT authenticated, redirect them to AWS Cognito login page**
  if (!auth.isAuthenticated) {
    auth.signinRedirect(); // 🚀 This ensures the AWS login page is opened
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Redirecting to AWS Cognito...
      </div>
    );
  }

  // **Once authenticated, load the Dashboard**
  return (
    <div className="bg-gray-200 min-h-screen">
      <Dashboard user={auth.user} />
      <button onClick={signOutRedirect} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Sign Out
      </button>
    </div>
  );
}

export default App;
