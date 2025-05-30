import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/candidate/Dashboard";
import App from "../App";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default AppRoutes;
