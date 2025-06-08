import { useEffect, useState } from "react";
import axios from "axios";
function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loadState, setLoadState] = useState(true);
  useEffect(() => {
    async function getApplicants() {
      try {
        const result = await axios.get("http://localhost:3000/get-applicants", {
          withCredentials: true,
        });
        console.log(result.data);
        setApplicants(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadState(false);
      }
    }
    getApplicants();
  }, []);
  return (
    <div className="ml-5">
      {loadState ? (
        <div className="text-center my-4">
          <div className="loader mx-auto mt-10 w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-2">Loading Applicants...</p>
        </div>
      ) : (
        <>
          <h1 className="text-center">Applicants</h1>
          <div>
            {applicants.length !== 0 ? (
              applicants.map((applicant) => {
                return (
                  <div className="border-2 rounded p-2 m-2" key={applicant}>
                    <div>{"Job Id: " + applicant.jobId._id}</div>
                    <div>{"Name: " + applicant.applicantId.name}</div>
                    <div>{"Email: " + applicant.applicantId.email}</div>
                  </div>
                );
              })
            ) : (
              <h1>No Applicants</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Applicants;
