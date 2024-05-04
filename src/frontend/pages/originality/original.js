import React, { useState, useEffect } from 'react';
import './ori.css';
import Sidebar from '../sidebar2/sidebar2';
import { useNavigate } from 'react-router-dom';

const Original = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // Fetch file information from the backend
  useEffect(() => {
    fetch('http://localhost:8080/Endohash/files')
      .then(response => {
        if (response.status === 404) {
          throw new Error('Resource not found');
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFiles(data))
      .catch(error => {
        console.error('Error fetching file information:', error.message);
      });
  }, []);
  

  const handleVerifyClick = (file) => {
    // Extract the necessary details from the file
    const { userId, filename,hash } = file;
    navigate('/vpage');
  };

  const handleDownloadClick = async (file) => {
    try {
      const response = await fetch(`http://localhost:8080/Endohash/download/${file.fileID}`);
      const blob = await response.blob();

      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>
          <h2>File List</h2>
          <h3>Please note the File's ID to verify</h3>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>FileID</th>
                <th>Filename</th>
                <th>Hash</th>
                <th>Size</th>
                <th>User ID</th>
                <th>Created Date</th>
                <th>Extension</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file._id}>
                  <td>{file.fileID}</td>
                  <td>{file.filename}</td>
                  <td>{file.hashedContent}</td>
                  <td>{file.size}</td>
                  <td>{file.userId}</td>
                  <td>{file.createdDate}</td>
                  <td>{file.extension}</td>
                  <td><button onClick={() => handleDownloadClick(file)}>Download</button><button onClick={() => handleVerifyClick(file)}>Verify</button></td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Original;