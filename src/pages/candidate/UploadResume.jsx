import axios from "axios";
import { useState } from "react";
function UploadResume() {
  const [file, setFile] = useState(null);
  async function uploadFile() {
    const fileData = new FormData();
    fileData.append("file", file);
    try {
      const result = await axios.post(
        "http://localhost:3000/upload-file",
        fileData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  return (
    <div className="flex justify-center items-center m-10">
      <div className="flex flex-col border-2 p-2 rounded">
        <div className="text-2xl">Resume</div>
        <input type="file" onChange={handleChange} />
        <button className="border-2 p-1 rounded mt-5" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadResume;
