import { useEffect, useState } from "react";
import axios from "axios";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
function GoogleSignIn() {
  const [role, setRole] = useState("");
  useEffect(() => {
    async function redirectingToDashboard() {
      try {
        const res = await axios.get("http://localhost:3000/get-user-details", {
          withCredentials: true,
        });
        const user = await res.data;
        setRole(user.role);
      } catch (err) {
        console.error("Error Fetching User Details: ", err);
      }
    }
    redirectingToDashboard();
  }, []);

  return (
    <>
      {role === "recruiter" ? (
        window.location.replace("http://localhost:5173/recruiter/dashboard") && (
          <RecruiterDashboard />
        )
      ) : role === "candidate" ? (
        window.location.replace("http://localhost:5173/candidate/dashboard") && (
          <CandidateDashboard />
        )
      ) : (
        <div className="text-2xl font-bold">Loading...</div>
      )}
    </>
  );
}

export function GoogleSignInFunction(route) {
  window.location.href = "http://localhost:3000" + route;
}

export default GoogleSignIn;
