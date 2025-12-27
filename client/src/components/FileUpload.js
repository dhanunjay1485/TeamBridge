import React, { useState } from "react";
import API from "../axios"; // axios instance with token

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedURL, setUploadedURL] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus("");
    setUploadedURL("");
  };

  const handleUpload = async () => {
  if (!file) {
    setUploadStatus("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await API.post("/upload/file", formData); // ❌ no need to manually set Content-Type
    setUploadStatus("✅ File uploaded successfully!");
    setUploadedURL(res.data.filePath);
  } catch (err) {
    setUploadStatus("❌ Error uploading file.");
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className="upload-container">
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadStatus && <p>{uploadStatus}</p>}
      {uploadedURL && (
        <p>
          File URL:{" "}
          <a href={`http://localhost:5000${uploadedURL}`} target="_blank" rel="noreferrer">
            {uploadedURL}
          </a>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
