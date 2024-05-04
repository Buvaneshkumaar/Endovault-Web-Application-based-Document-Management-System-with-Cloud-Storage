import React, { useState, useEffect } from 'react';

import Sidebar from "../sidebar2/sidebar2";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Removefiles() {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [keywordsFilter, setKeywordsFilter] = useState('');
  const [rankKeyword, setRankKeyword] = useState('');
  const [rankedFiles, setRankedFiles] = useState([]);
  const [documentScores, setDocumentScores] = useState([]);
 
 

  useEffect(() => {
    // Fetch files from the backend API
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/Simupload/upload1');
      const allFiles = await response.json();
      setFiles(allFiles);
      setDocumentScores([]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFile = async (fileId) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm('Do you really want to delete the file?');
  
    if (!userConfirmed) {
      // User canceled the deletion
      return;
    }
  
    try {
      await fetch(`http://localhost:8080/Simupload/deleteFile/${fileId}`, {
        method: 'DELETE',
      });
  
      toast.success('File deleted successfully', { position: toast.POSITION.TOP_RIGHT });
      // Update the file list after deletion
      fetchFiles();
    } catch (error) {
      console.error(error);
      toast.error('Error deleting file', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return(
  <>
  {/* <ToastContainer /> */}
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>
        
          <div className="filters-container">
            <br></br>
            <br>
            </br>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(rankedFiles.length > 0 ? rankedFiles : files).map((file, index) => (
                    <tr key={index}>
                      <td>{file.domain}</td>
                      <td>{file.filename}</td>
                      <td>{file.urd}</td>
                      <td>{file.descrip}</td>
                      <td>{file.code}</td>
                      <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                      <td>{file.fileSize}</td>
                      <td>{file.fileExtension}</td>
                      <td>
                        <button onClick={() => deleteFile(file._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Removefiles;