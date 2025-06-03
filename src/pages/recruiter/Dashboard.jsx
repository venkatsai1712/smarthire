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
        console.error("Error fetching user details:", error);
      }
    }
    fetchData();
  }, []);

  async function logout() {
    try {
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="text-center">Recruiter</h1>
      <button onClick={logout}>Logout</button>
      <br></br>
      <Link to="/recruiter/dashboard/post-job" className="text-blue-500">
        Post a Job
      </Link>
      <br></br>
      <Link to="/recruiter/dashboard/applicants" className="text-blue-500">
        Applicants
      </Link>
    </>
  );
}

export default Dashboard;
