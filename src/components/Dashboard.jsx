import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloudUploadIcon, ClipboardListIcon, CalendarIcon, UserCircleIcon, LogoutIcon } from "@heroicons/react/outline";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom"; 

const API_BASE_URL = "http://localhost:5000"; // Update with actual EC2 IP

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [file, setFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [xrayAnalysis, setXrayAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      navigate("/"); // Redirect to login if not authenticated
    } else if (auth.isAuthenticated) {
      navigate("/dashboard");
      fetchData();
    }
  }, [auth.isAuthenticated]); // ✅ Fetches data only once
  
  
  const fetchData = async () => {
      try {
        // Fetch User Data
        const userResponse = await axios.get(`${API_BASE_URL}/user`);
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({
          name: auth.user?.profile.email || "John Doe",
          id: "12345",
          age: 30,
          bloodType: "O+",
          weight: "75kg",
        });
      }

      try {
        // Fetch Medical Records
        const recordsResponse = await axios.get(`${API_BASE_URL}/records`);
        setRecords(recordsResponse.data.length ? recordsResponse.data : [
          { name: "General Checkup", date: "Jan 15, 2025" },
          { name: "Blood Test", date: "Feb 10, 2025" }
        ]);
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([
          { name: "General Checkup", date: "Jan 15, 2025" },
          { name: "Blood Test", date: "Feb 10, 2025" }
        ]);
      }

      try {
        // Fetch Prescriptions
        const prescriptionsResponse = await axios.get(`${API_BASE_URL}/prescriptions`);
        setPrescriptions(prescriptionsResponse.data.length ? prescriptionsResponse.data : [
          { name: "Paracetamol", dosage: "Twice daily" },
          { name: "Ibuprofen", dosage: "As needed" }
        ]);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setPrescriptions([
          { name: "Paracetamol", dosage: "Twice daily" },
          { name: "Ibuprofen", dosage: "As needed" }
        ]);
      }

      try {
        // Fetch Appointments
        const appointmentsResponse = await axios.get(`${API_BASE_URL}/appointments`);
        setAppointments(appointmentsResponse.data.length ? appointmentsResponse.data : [
          { doctor: "Dr. Sarah Smith", date: "Mar 5, 2025" }
        ]);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([
          { doctor: "Dr. Sarah Smith", date: "Mar 5, 2025" }
        ]);
      }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    setError("");
    setXrayAnalysis(null);

    const formData = new FormData();
    formData.append("xray", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload-xray`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("X-Ray uploaded successfully!");

      // Assuming the backend returns analysis results
      setXrayAnalysis(response.data);
    } catch (error) {
      console.error("Error uploading X-Ray:", error);
      setError("Failed to upload and analyze the X-ray.");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Logout Function that Clears Session and Redirects
  const handleLogout = async () => {
    const clientId = "7rfb69gglntu7klpdq77i9asau";
    const logoutUri = "http://localhost:3000/"; // Change to production domain if needed
    const cognitoDomain = "https://us-east-24tftlwzgp.auth.us-east-2.amazoncognito.com";
    //Clear Local Storage & Session Storage
    localStorage.clear();
    sessionStorage.clear();
    await auth.removeUser(); // Clears authentication session
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
        <div className="text-white text-2xl font-bold">
          <img src="/logo.png" alt="MedPortal" className="h-10 inline-block mr-2" />
          MedPortal
        </div>

        <div className="relative">
          <button 
            className="flex items-center text-white text-lg focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <UserCircleIcon className="h-8 w-8 mr-2" />
            {userData ? userData.name : "Guest"}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <LogoutIcon className="h-5 w-5 inline-block mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800">Medical Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* User Profile */}
          <div className="bg-white p-4 rounded-lg shadow">
            {userData && (
              <>
                <h3 className="text-xl font-semibold">{userData.name}</h3>
                <p className="text-gray-600">ID: {userData.id}</p>
                <p className="mt-2"><strong>Age:</strong> {userData.age}</p>
                <p><strong>Blood Type:</strong> {userData.bloodType}</p>
                <p><strong>Weight:</strong> {userData.weight} kg</p>
              </>
            )}
          </div>

          {/* Recent Records */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Recent Records</h3>
            {records.map((record, index) => (
              <p key={index} className="mt-2">{record.name} - {record.date}</p>
            ))}
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Active Prescriptions</h3>
            {prescriptions.map((prescription, index) => (
              <p key={index} className="mt-2">{prescription.name} - {prescription.dosage}</p>
            ))}
          </div>
        </div>

        {/* X-Ray Upload & Analysis */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold">X-Ray Analysis</h3>
          <div className="border-dashed border-2 border-gray-300 p-6 text-center mt-4">
            <CloudUploadIcon className="w-10 h-10 mx-auto text-gray-500" />
            <p className="text-gray-500 mt-2">Drop your chest X-Ray here or click to upload</p>
            <input type="file" onChange={handleFileChange} className="mt-4 border p-2 rounded" />
            <button onClick={handleUpload} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
              Upload X-Ray
            </button>
          </div>

          {/* Display Analysis Results */}
          {loading && <p className="text-gray-500 mt-4">Analyzing X-Ray...</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {xrayAnalysis && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
              <h4 className="text-lg font-semibold">Analysis Result</h4>
              <p><strong>Condition:</strong> {xrayAnalysis.condition}</p>
              <p><strong>Accuracy:</strong> {xrayAnalysis.accuracy}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-6 text-center">
        <p>© 2025 MedPortal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
