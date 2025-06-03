import { useEffect, useState } from "react";
import axios from "axios";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
function GoogleSignIn() {
  const [role, setRole] = useState("");
  const [loadState, setLoadState] = useState(true);
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
      } finally {
        setLoadState(false);
      }
    }
    redirectingToDashboard();
  }, []);

  return (
    <>
      {loadState ? (
        <div className="text-center my-4">
          <div className="loader mx-auto mt-10 w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {role === "recruiter"
            ? window.location.replace(
                "http://localhost:5173/recruiter/dashboard"
              ) && <RecruiterDashboard />
            : window.location.replace(
                "http://localhost:5173/candidate/dashboard"
              ) && <CandidateDashboard />}
        </>
      )}
    </>
  );
}

export function GoogleSignInFunction(route) {
  window.location.href = "http://localhost:3000" + route;
}

export default GoogleSignIn;
