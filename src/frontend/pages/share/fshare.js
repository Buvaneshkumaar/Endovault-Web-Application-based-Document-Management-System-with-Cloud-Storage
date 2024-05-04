import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar2/sidebar2';

function DownloadFiles() {
  const [files, setFiles] = useState([]);
  const [shareEmails, setShareEmails] = useState({}); // Track share emails for each file

  useEffect(() => {
    fetch('http://localhost:8080/Simupload/upload1')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error(error));
  }, []);

  const handleShareEmailChange = (fileId, email) => {
    setShareEmails((prevEmails) => ({
      ...prevEmails,
      [fileId]: email,
    }));
  };

  const shareFile = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:8080/Simupload/shareFile/${fileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: shareEmails[fileId] }),
      });

      if (response.ok) {
        alert('File shared successfully!');
      } else {
        console.error('Error sharing file');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <div style={{ display: 'flex' }}>
      <Sidebar />
      <div>
        
        <div className='container'>
          <table border='1'>
            <thead>
            <tr>
                    <th>Domain</th>
                    <th>Title</th>
                    <th>URD</th>
                    <th>Description</th>
                    <th>Access Code</th>
                    <th>Uploaded Date</th>
                    <th>File Size (MB)</th>
                    <th>File Extension</th>
                    <th>Email</th>
                    <th>Actions</th> 
                  </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id}>
                   <td>{file.domain}</td>
                      <td>{file.filename}</td>
                      <td>{file.urd}</td>
                      <td>{file.descrip}</td>
                      <td>{file.code}</td>
                      <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                      <td>{file.fileSize}</td>
                      <td>{file.fileExtension}</td>
                 
                  <td>
                    <input
                      type="text"
                      value={shareEmails[file._id] || ''}
                      onChange={(e) => handleShareEmailChange(file._id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => shareFile(file._id)}>Share</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
}

export default DownloadFiles;
