import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-user-details",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error Fetching User Details: ", error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-center">Candidate</h1>
      <Link to="/candidate/dashboard/job-list" className="text-blue-500">
        Job List
      </Link>
    </>
  );
}

export default Dashboard;
