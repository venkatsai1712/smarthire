import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Applicants from "../recruiter/Applicants";
function Dashboard() {
  const [userName,setUserName] = useState("");
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
    <div>
      <div className="flex justify-between items-center p-5 border-b-1">
        <div className="text-xl">Dashboard</div>
        <div className="flex justify-evenly items-center">
          <Link to="/recruiter/dashboard/post-job" className=" mr-10">
            Post a Job
          </Link>
          <Link to="/recruiter/dashboard/applicants" className=" mr-10">
            Applicants
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
        <div className="text-2xl m-5">Welcome <i>{userName}</i> !</div>
        <Applicants/>
      </div>
    </div>
  );
}

export default Dashboard;
