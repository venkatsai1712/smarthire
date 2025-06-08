import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobList from "../candidate/JobList";
function Dashboard() {
  const [userName, setUserName] = useState("");
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
        setUserName(response.data.displayName);
      } catch (error) {
        console.error("Error Fetching User Details: ", error);
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
    <div>
      <div className="flex justify-between items-center p-5 border-b-1">
        <div className="text-xl">Dashboard</div>
        <div className="flex justify-evenly items-center">
          <Link to="/candidate/dashboard/upload-resume" className=" mr-10">
            Upload Resume
          </Link>
          <Link to="/candidate/dashboard/job-list" className=" mr-10">
            Job List
          </Link>
          <button
            onClick={logout}
            className="border-2 rounded p-1 hover:bg-white hover:text-black hover:font-semibold text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      <div>
        <div className="text-2xl m-5">
          Welcome <i>{userName}</i> !
        </div>
        <JobList />
      </div>
    </div>
  );
}

export default Dashboard;
