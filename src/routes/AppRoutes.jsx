import { Route, Routes } from "react-router-dom";
import CandidateDashboard from "../pages/candidate/Dashboard";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import App from "../App";
import GoogleSignIn from "../services/GoogleSignIn";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/google-sign-in" element={<GoogleSignIn />}></Route> 
      <Route path="/candidate/dashboard" element={<CandidateDashboard />}></Route>
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />}></Route>
    </Routes>
  );
}

export default AppRoutes;
