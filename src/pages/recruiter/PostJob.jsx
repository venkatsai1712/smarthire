import { useState } from "react";
import axios from "axios";
import RecruiterDashboard from "./Dashboard";

function PostJob() {
  const allSkills = ["Java", "JavaScript", "C", "C++", "Python"];
  const jobType = ["Full-Time", "Part-Time", "Internship", "Remote", "Hybrid"];
  const allCities = [
    "Hyderabad",
    "Chennai",
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "Pune",
  ];
  const experience = ["Fresher", "1", "2", "3", "4", "5+"];
  const [salary, setSalary] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState("");
  const [jobTypeInput, setJobtypeInput] = useState("Full-Time");
  const [cityInput, setCityInput] = useState("Hyderabad");
  const [experienceInput, setExperienceInput] = useState("Fresher");

  const handleSkillChange = (skill) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  function sendData() {
    const jobData = {
      title: jobTitle,
      description: jobDescription,
      skills: skills,
      type: jobTypeInput,
      city: cityInput,
      experience: experienceInput,
      salary: salary,
    };

    axios
      .post("http://localhost:3000/post-job", jobData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.message);
      })
      .catch((err) => {
        console.error("Error posting job:", err);
      });
  }

  return (
    <>
      {status !== "Job Posted Successfully" ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl my-5">Post a Job</h1>
          <div className="border-2 p-5 rounded flex justify-center flex-col">
            <div className="grid grid-cols-2 gap-2 my-5">
              <label htmlFor="jobTitle">Job Title:</label>
              <input
                className="border-2 rounded my-2 p-1"
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
              <label htmlFor="jobDescription">Job Description:</label>
              <textarea
                className="border-2 rounded my-2 p-1"
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              ></textarea>

              <label htmlFor="Skills">Skills Required:</label>
              <div className="grid grid-cols-1 gap-2">
                {allSkills.map((skill, index) => {
                  return (
                    <div key={skill} className="grid grid-cols-2 gap-2">
                      <label htmlFor={"skill" + index}>{skill}</label>
                      <input
                        type="checkbox"
                        id={"skill" + index}
                        onChange={() => handleSkillChange(skill)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <label htmlFor="JobType">Job Type:</label>
            <select
              id="JobType"
              onChange={(e) => {
                setJobtypeInput(e.target.value);
              }} value={jobTypeInput}
            >
              {jobType.map((type, index) => {
                return <option key={type}>{type}</option>;
              })}
            </select>

            <label htmlFor="Cities">City:</label>
            <select
              id="Cities"
              onChange={(e) => {
                setCityInput(e.target.value);
              }} value={cityInput}
            >
              {allCities.map((city, index) => {
                return <option key={city}>{city}</option>;
              })}
            </select>

            <label htmlFor="Experience">Experience:</label>
            <select
              id="Experience"
              onChange={(e) => {
                setExperienceInput(e.target.value);
              }}
              value={experienceInput}
            >
              {experience.map((exp, index) => {
                return <option key={exp}>{exp}</option>;
              })}
            </select>

            <label htmlFor="Salary">Salary:</label>
            <input
              id="Salary"
              onChange={(e) => {
                setSalary(e.target.value);
              }} type="number"
            />

            <button
              className="border-2 p-2 rounded hover:text-blue-500"
              onClick={sendData}
            >
              Post Job
            </button>
          </div>
        </div>
      ) : (
        <RecruiterDashboard />
      )}
    </>
  );
}

export default PostJob;
