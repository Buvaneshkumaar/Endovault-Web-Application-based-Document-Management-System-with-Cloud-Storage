// fveri.js
import React, { useState } from 'react';
import './fver.css';
import Sidebar from '../sidebar2/sidebar2';

const FileForm = ({ onGenerateHash }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [userId, setUserId] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleGenerateHash = async () => {
    if (!file || !filename || !userId) {
      alert('Please fill in all the fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('userId', userId);

    try {
      const response = await fetch('http://localhost:8080/Endohash/generateHash', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error(`Error generating hash: ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        console.log('Response from server:', data);

        // Assuming you have a callback for hash generation
        if (onGenerateHash && typeof onGenerateHash === 'function') {
          onGenerateHash(data.hash, data.size);
        }

        // Show success alert
        alert('Hash generated and stored successfully!');
      } else {
        console.error('Unexpected response format:', await response.text());
      }
    } catch (error) {
      console.error('Error generating hash:', error);
    }

    // Reset the inputs and selected file
    setFilename('');
    setUserId('');
    setFile(null);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div
          style={{
            marginTop: '80px',
            padding: '20px',
            outline: '10px solid #34ebba',
            animation: 'blink 1s infinite',
            height: '500px',
            width: '800px',
          }}
        >
          <h2>File Information</h2>
          <br></br>
          <br></br>
          <form>
            <label>
              UserID:
              <input type="text" value={userId} onChange={handleUserIdChange} />
            </label>
            <br />
            <label>
              Filename:
              <input type="text" value={filename} onChange={handleFilenameChange} />
            </label>
            <br />
            <label>
              Select File:
              <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <button type="button" onClick={handleGenerateHash}>
              Generate Hash and Store
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FileForm;
