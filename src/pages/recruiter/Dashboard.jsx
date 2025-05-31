import axios from "axios";
import { useEffect } from "react";
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
        console.error("Error fetching user details:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <h1>Recruiter</h1>
    </>
  );
}

export default Dashboard;