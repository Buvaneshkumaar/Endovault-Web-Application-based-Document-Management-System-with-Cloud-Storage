import React, { useState } from 'react';
import './com.css';
import Sidebar from '../sidebar2/sidebar2';

// New Alert component for displaying a styled alert
const Alert = ({ message }) => (
  <div className="alert">
    {message}
  </div>
);

function Compress() {

  // const [showFileUpload, setShowFileUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [download, setDownload] = useState(null);
  const [compressionSuccess, setCompressionSuccess] = useState(false); 
  const [originalFileExtension, setOriginalFileExtension] = useState(null);

  const handleFileChange = (event) => {
    // setFile(event.target.files[0]);
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setCompressionSuccess(false); 
    setOriginalFileExtension(selectedFile.name.split('.').pop());// Reset success status when a new file is selected
  };

  const handleCompress = async () => {
    try {
      if (!file) {
        console.error('No file selected.');
        return;
      }

      console.log('File gets selected');
      const formData = new FormData();
      formData.append('file', file, file.name);

      const response = await fetch('http://localhost:8080/Endocompress/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error compressing file. Server response:', response.status, response.statusText);
        return;
      }

      setCompressionSuccess(true); // Set success status to true

      const compressedData = await response.blob();
      const downloadUrl = URL.createObjectURL(compressedData);
      setDownload(downloadUrl);
    } catch (error) {
      console.error('Error compressing file:', error);
      setCompressionSuccess(false); // Set success status to false on error
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="comp">
          <form className="fbody">
            <h1>File Compression</h1>
            <input type="file" accept=".txt,.docx,.pdf" name="file" onChange={handleFileChange} />
            <button type="button" onClick={handleCompress}>
              Compress
            </button>
            <br>
            </br>
            <br>
            </br>
            {compressionSuccess && (
  <>
    <Alert message="Compression successful!" />
    <Alert message="*** Wait for the compressed file to download ***" />
  </>
)}
         {download && (
              <a href={download} download={`${file.name.replace(/\.[^/.]+$/, "")}.${originalFileExtension}`}>
                Download Compressed File
              </a>
            )}
          </form>
         
        

          
        </div>
      </div>

    </>
  );
}

export default Compress;
