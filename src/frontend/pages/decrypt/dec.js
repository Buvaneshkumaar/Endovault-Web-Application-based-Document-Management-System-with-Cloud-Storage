import React, { useState, useEffect } from 'react';
import Sidebar from "../sidebar2/sidebar2";
import 'react-toastify/dist/ReactToastify.css';

function Downloadfiles() {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [keywordsFilter, setKeywordsFilter] = useState('');
  const [accessCodeFilter, setAccessCodeFilter] = useState(''); // New state for access code filter
  const [rankKeyword, setRankKeyword] = useState('');
  const [rankedFiles, setRankedFiles] = useState([]);
  const [documentScores, setDocumentScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/Simupload/upload1')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error(error));

    if (rankKeyword.trim() !== '') {
      fetch(`http://localhost:8080/Simupload/rankFiles?keyword=${rankKeyword}`)
        .then(response => response.json())
        .then(scores => setDocumentScores(scores))
        .catch(error => console.error(error));
    }
  }, [rankKeyword]);

  const rankFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Simupload/rankFiles?keyword=${rankKeyword}`);
      const rankedFiles = await response.json();
      setRankedFiles(rankedFiles);
    } catch (error) {
      console.error(error);
    }
  };

  const resetRank = () => {
    setRankKeyword('');
    setRankedFiles([]);
    setDocumentScores([]);
  };

  const filterFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Simupload/filterByKeywords?keyword=${keywordsFilter}`);
      const filteredFiles = await response.json();
      setFiles(filteredFiles);
      setDocumentScores([]);
    } catch (error) {
      console.error(error);
    }
  };

  const filterByAccessCode = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Simupload/filterByAccessCode?accessCode=${accessCodeFilter}`);
      const filteredFiles = await response.json();
      setFiles(filteredFiles);
      setDocumentScores([]);
    } catch (error) {
      console.error(error);
    }
  };

  const filterByTitle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Simupload/filterByTitle?title=${filter}`);
      const filteredFiles = await response.json();
      setFiles(filteredFiles);
      setDocumentScores([]);
    } catch (error) {
      console.error(error);
    }
  };


  const resetFilters = async () => {
    setDomainFilter('');
    setFilter('');
    setKeywordsFilter('');
    setAccessCodeFilter(''); // Reset access code filter
    try {
      const response = await fetch('http://localhost:8080/Simupload/upload1');
      const allFiles = await response.json();
      setFiles(allFiles);
      setDocumentScores([]);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadFile = async (file) => {
    try {
      const response = await fetch(`http://localhost:8080/Simupload/downloadFile/${file._id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error('Error downloading file');
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


          <div className="filters-container">
            <br></br>
            <br></br>

            <label>Filter by Domain:</label>
            <input type="text" value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} />
            <br></br>
            <br></br>

            <label>Filter by Keywords:</label>
            <input type="text" value={keywordsFilter} onChange={(e) => setKeywordsFilter(e.target.value)} />
            <button onClick={filterFiles}>Apply Keyword Filter</button>
            <button onClick={resetFilters}>Reset Filters</button>
            <br></br>
            <br></br>

            <label>Filter by Access Code:</label>
            <input type="text" value={accessCodeFilter} onChange={(e) => setAccessCodeFilter(e.target.value)} />
            <button onClick={filterByAccessCode}>Search by Access Code</button>
            <br></br>
            <br></br>

            <label>Filter by Title:</label>
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <button onClick={filterByTitle}>Search by Title</button>
            <br></br>
            <br></br>
            <button onClick={resetFilters}>Reset Filters</button>
            {/* <button onClick={() => { setAccessCodeFilter(''); filterByAccessCode(); }}>Reset Access Code Filter</button>
            <button onClick={() => { setFilter(''); filterByTitle(); }}>Reset Title Filter</button> */}
            <br>
            </br>
            <br></br>
            <label>Rank by Keyword:</label>
            <input type="text" value={rankKeyword} onChange={(e) => setRankKeyword(e.target.value)} />
            <button onClick={rankFiles}>Rank</button>
            <button onClick={resetRank}>Reset Rank</button>
            <br></br>
            <br></br>

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
                    <th>Actions</th> {/* New column for actions */}
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
                        <button onClick={() => downloadFile(file)}>Decrypt and Download</button>
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

export default Downloadfiles;
