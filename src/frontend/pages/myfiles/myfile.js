import React, { useState, useEffect } from 'react';
import './myfilecss.css';
import Sidebar from "../sidebar2/sidebar2";
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate } from 'react-router-dom';
function Myfiles() {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [keywordsFilter, setKeywordsFilter] = useState('');
  const [rankKeyword, setRankKeyword] = useState('');
  const [rankedFiles, setRankedFiles] = useState([]);
  const [documentScores, setDocumentScores] = useState([]);

  useEffect(() => {
    // Fetch files from the backend API
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
  //   const filteredFiles = files.filter(file => {
  //     const filenameMatch = file.filename.toLowerCase().includes(filter.toLowerCase());
  //     const domainMatch = file.domain.toLowerCase().includes(domainFilter.toLowerCase());
  //     return filenameMatch && domainMatch;
  // });

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

  const resetFilters = async () => {
    // Reset filters and fetch all files
    setDomainFilter('');
    setFilter('');
    setKeywordsFilter('');
    try {
      const response = await fetch('http://localhost:8080/Simupload/upload1');
      const allFiles = await response.json();
      setFiles(allFiles);
      setDocumentScores([]);
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
            <br>
            </br>

            <label>Filter by Domain:</label>
            <input type="text" value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} />
            <br>
            </br>
            <br>
            </br>

            {/* filtered by keywords */}
            <label>Filter by Keywords:</label>
            <input type="text" value={keywordsFilter} onChange={(e) => setKeywordsFilter(e.target.value)} />
            <button onClick={filterFiles}>Apply Keyword Filter</button>
            <button onClick={resetFilters}>Reset Filters</button>
            <br></br>
            <br></br>
            <label>Filter by Title:</label>
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <br></br>
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


                  </tr>
                </thead>

                {/* FILTERING MAPPING */}

                {/* <tbody>
            {filteredFiles.map(file => (
              <tr key={file._id}>
                <td>{file.domain}</td>
                <td>{file.filename}</td>
                <td>{file.urd}</td>
                <td>{file.descrip}</td>
                <td>{file.code}</td>
                <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                <td>{file.fileSize}</td>
                <td>{file.fileExtension}</td>
                
                
              </tr>
            ))}
                    </tbody> */}

                {/* RANKING MAPPING */}

                {/* <tbody>
              {rankedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.domain}</td>
                  <td>{file.filename}</td>
                  <td>{file.urd}</td>
                <td>{file.descrip}</td>
                <td>{file.code}</td>
                <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                <td>{file.fileSize}</td>
                <td>{file.fileExtension}</td>
                  
                </tr>
              ))}
            </tbody> */}

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
                      <td>{documentScores[index]?.score?.toFixed(4)}</td>


                    </tr>
                  ))}
                </tbody>


              </table>
            </div>






          </div>

        </div>
      </div>
    </>
  )


}
export default Myfiles;
