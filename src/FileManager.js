import React, { useState, useEffect } from "react";

export default function FileManager({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Handle file input changes
  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  // Upload selected file
   //replace for prod: https://lewis-tac-toe-server.azurewebsites.net
  async function handleUpload() {
    if (!selectedFile) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("email", user.email); // optional metadata

    try {
      const res = await fetch(
        "https://lewis-tac-toe-server.azurewebsites.net/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("File uploaded successfully!");
        setSelectedFile(null);
        loadFiles();
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  }

  // Load files from server
  //replace for prod: https://lewis-tac-toe-server.azurewebsites.net
  // and scroll down to replace other one
  async function loadFiles() {
    try {
      const res = await fetch(
        "https://lewis-tac-toe-server.azurewebsites.net/api/files"
      );
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="file-manager">
      <h2>File Manager</h2>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Uploaded Files:</h3>
      <ul>
        {files.length > 0 ? (
          files.map((file) => (
            <li key={file._id}>
              {file.filename}{" "}
              <a
                href={`https://lewis-tac-toe-server.azurewebsites.net/api/files/${file.filename}`}
                download
              >
                Download
              </a>
            </li>
          ))
        ) : (
          <li>No files uploaded yet.</li>
        )}
      </ul>
    </div>
  );
}
