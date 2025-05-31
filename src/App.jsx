import { useState, useEffect } from "react";
import SignInButton from "./components/SignInButton";
import axios from "axios";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import CandidateDashboard from "./pages/candidate/Dashboard";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function checkUserAuthentication() {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-user-details",
          {
            withCredentials: true,
          }
        );
        console.log("User details:", response.data);
        setUser(response.data.role.toString());
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    checkUserAuthentication();
  }, []);

  return (
    <>
      {user === "recruiter" ? (
        <RecruiterDashboard />
      ) : user === "candidate" ? (
        <CandidateDashboard />
      ) : (
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-center text-3xl m-5">Smart Hire</h1>
          <SignInButton route="/sign-in/candidate">
            Sign In as Candidate
          </SignInButton>
          <SignInButton route="/sign-in/recruiter">
            Sign In as Recruiter
          </SignInButton>
        </div>
      )}
    </>
  );
}

export default App;
