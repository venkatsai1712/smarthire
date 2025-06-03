import { Route, Routes } from "react-router-dom";
import CandidateDashboard from "../pages/candidate/Dashboard";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import App from "../App";
import GoogleSignIn from "../services/GoogleSignIn";
import PostJob from "../pages/recruiter/PostJob";
import JobList from "../pages/candidate/JobList";
import Applicants from "../pages/recruiter/Applicants";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/google-sign-in" element={<GoogleSignIn />}></Route>
      <Route
        path="/candidate/dashboard"
        element={<CandidateDashboard />}
      ></Route>
      <Route path="/candidate/dashboard/job-list" element={<JobList />}></Route>
      <Route
        path="/recruiter/dashboard"
        element={<RecruiterDashboard />}
      ></Route>
      <Route path="/recruiter/dashboard/post-job" element={<PostJob />}></Route>
      <Route
        path="/recruiter/dashboard/applicants"
        element={<Applicants />}
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
