import axios from "axios";
import { useState, useEffect } from "react";
function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("http://localhost:3000/get-user-details", {
          withCredentials: true,
        });
        const data = await res.data;
        setUserDetails(data);
        return 0;
      } catch (err) {
        console.log(err);
        window.location.href = "http://localhost:5173";
        return 1;
      }
    }
    getData();
  }, []);

  return (
    <>
      {userDetails !== null ? (
        <h1>Welcome {userDetails.name.givenName}</h1>
      ) : (
        <h1>
          <a href="/" className="text-blue">
            Sign In
          </a>
        </h1>
      )}
    </>
  );
}

export default Dashboard;
