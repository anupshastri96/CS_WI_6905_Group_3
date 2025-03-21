import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloudUploadIcon, ClipboardListIcon, CalendarIcon } from "@heroicons/react/outline";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get("https://api.yourapp.com/user")
      .then(response => setUserData(response.data))
      .catch(error => console.error("Error fetching user data:", error));

    axios.get("https://api.yourapp.com/records")
      .then(response => setRecords(response.data))
      .catch(error => console.error("Error fetching records:", error));

    axios.get("https://api.yourapp.com/prescriptions")
      .then(response => setPrescriptions(response.data))
      .catch(error => console.error("Error fetching prescriptions:", error));

    axios.get("https://api.yourapp.com/appointments")
      .then(response => setAppointments(response.data))
      .catch(error => console.error("Error fetching appointments:", error));
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("xray", file);

    try {
      await axios.post("https://api.yourapp.com/upload-xray", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("X-Ray uploaded successfully!");
    } catch (error) {
      console.error("Error uploading X-Ray:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
          {records.length ? (
            records.map((record, index) => (
              <p key={index} className="mt-2">{record.name} - {record.date}</p>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No recent records</p>
          )}
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Prescriptions</h3>
          {prescriptions.length ? (
            prescriptions.map((prescription, index) => (
              <p key={index} className="mt-2">{prescription.name} - {prescription.dosage}</p>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No active prescriptions</p>
          )}
        </div>
      </div>

      {/* X-Ray Upload */}
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
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        {appointments.length ? (
          appointments.map((appointment, index) => (
            <div key={index} className="mt-4 flex items-center">
              <CalendarIcon className="w-6 h-6 text-gray-500 mr-2" />
              <p>{appointment.doctor} - {appointment.date}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No upcoming appointments</p>
        )}
        <button className="mt-4 bg-black text-white py-2 px-4 rounded">
          Schedule New Appointment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
