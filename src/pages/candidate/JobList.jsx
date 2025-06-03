import axios from "axios";
import { useEffect, useState } from "react";
function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loadState, setLoadState] = useState(true);
  useEffect(() => {
    async function getJobs() {
      try {
        const result = await axios.get("http://localhost:3000/get-jobs", {
          withCredentials: true,
        });
        console.log(result.data);
        setJobs(result.data);
        setFilteredJobs(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadState(false);
      }
    }
    getJobs();
  }, []);

  function filterCity(city) {
    if (city === "All") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.city === city));
    }
  }

  function filterType(type) {
    setFilteredJobs(jobs.filter((job) => job.type === type));
  }

  async function applyJob(jobId, postedId) {
    const data = {
      jobId: jobId,
      postedId: postedId,
    };
    try {
      const result = await axios.post("http://localhost:3000/apply-job", data, {
        withCredentials: true,
      });
      if (result.status === 201) {
        alert("Job Applied");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {loadState ? (
        <div className="text-center my-4">
          <div className="loader mx-auto mt-10 w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-2">Loading Applicants...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-1 justify-center items-center">
            <h1 className="text-center my-5">Jobs</h1>
            <select className="w-30"
              onChange={(e) => {
                filterCity(e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
            </select>
            <select className="w-30"
              onChange={(e) => {
                filterType(e.target.value);
              }}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="grid grid-cols-4">
            {filteredJobs.length !== 0 ? (
              filteredJobs.map((element) => {
                return (
                  <div
                    className="border-2 rounded p-2 m-2 flex justify-center flex-col"
                    key={element}
                  >
                    <div
                      className=" grid grid-cols-2 items-center"
                      key={element._id}
                    >
                      <span className="text-xs">Title:</span>{" "}
                      <div>{element.title}</div>
                      <span className="text-xs">Description: </span>
                      <div>{element.description}</div>
                      <span className="text-xs">Salary: </span>
                      <div> {element.salary}</div>
                      <span className="text-xs">City: </span>
                      <div>{element.city}</div>
                      <span className="text-xs">Experience:</span>
                      <div>{element.experience}</div>
                      <span className="text-xs">Type:</span>
                      <div> {element.type}</div>
                      <span className="text-xs">Skills: </span>
                      <div className="">
                        [
                        {element.skills.map((skill) => {
                          return <span key={skill}> {skill}, </span>;
                        })}
                        ]
                      </div>
                    </div>
                    <button
                      className="border-2 rounded text-sm mt-4 p-1 pb-2 hover:text-blue-300"
                      onClick={() => {
                        applyJob(element._id, element.postedBy);
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                );
              })
            ) : (
              <div key={"no jobs"}>No Jobs</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default JobList;
