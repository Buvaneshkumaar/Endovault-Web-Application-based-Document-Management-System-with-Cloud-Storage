import React, { useState, useEffect } from 'react';

import './ov.css';
// import Sidebar from '../sidebar2/sidebar2';



const VerifyPage = () => {


 

  const [userId, setUserId] = useState('');
  const [filename, setFilename] = useState('');
  const [fileID,setFileID]=useState('');
  const [fileToVerify, setFileToVerify] = useState(null);
  const [instantHash, setInstantHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [checkingOriginality, setCheckingOriginality] = useState(false);

  // useEffect(() => {
  //   // Set the userId and filename from the original.js state
  //   setUserId(originalUserId || '');
  //   setFilename(originalFilename || '');

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };



  // }, [originalUserId, originalFilename]);


  // const handleBeforeUnload = (event) => {
  //   // Reset inputs on page refresh
  //   event.preventDefault();
  //   resetInputs();
  // };

  useEffect(() => {
    const handleUnload = () => {
      resetInputs();
    };
  
    window.addEventListener('unload', handleUnload);
  
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  // useEffect(() => {
  //   const fetchFileInformation = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8080/Endohash/files/${fileId}`);
  //       if (!response.ok) {
  //         throw new Error('File information not found');
  //       }

  //       const fileData = await response.json();
  //       if (fileData && fileData.filename && fileData.userId) {
  //         setFilename(fileData.filename);
  //         setUserId(fileData.userId);
  //       } else {
  //         throw new Error('Invalid file information received');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching file information:', error.message);
  //     }
  //   };

  //   fetchFileInformation();
  // }, [fileId]);


  const resetInputs = () => {
    if (!checkingOriginality) {
      // Reset inputs only if not in the process of checking originality
      setUserId('');
      setFilename('');
      setFileToVerify(null);
      setInstantHash('');
      setVerificationResult('');
      setFileID(''); // Add this line to reset fileID
    }
  };

  const handleFileChange = (event) => {
    // Handle file selection
    const file = event.target.files[0];
    setFileToVerify(file);
    setInstantHash('');

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInstantHash(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleGenerateHashClick = () => {
    // Send the file to the backend to generate the hash
    const formData = new FormData();
    formData.append('file', fileToVerify);

    fetch('http://localhost:8080/Endohash/generateInstantHash', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => setInstantHash(data.hash))
      .catch(error => {
        console.error('Error generating instant hash:', error);
      });
  };

  const handleCheckOriginalityClick = () => {
    // Send a request to the backend to check the originality
    setCheckingOriginality(true);
    fetch('http://localhost:8080/Endohash/checkOriginality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileID,  // Add fileID to the request body
        instantHash,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const resultMessage = data.message;
  
        // Compare the details with the original file
        if (resultMessage === 'File not found') {
          setVerificationResult('File not found');
        } else if (resultMessage === 'Content not modified') {
          setVerificationResult('Content not modified');
        } else if (resultMessage === 'Content modified') {
          setVerificationResult('Content modified');
        } else {
          setVerificationResult('Unknown result');
        }
  
        // Add a class to trigger blinking
        setTimeout(() => {
          setVerificationResult('');
          setCheckingOriginality(false);
          resetInputs();
        }, 100000); // Adjust the duration as needed
      })
      .catch(error => {
        console.error('Error checking originality:', error);
        setCheckingOriginality(false);
      });
  };

  return (
  
    <div className="center-container">
      <h2>Verification Page</h2>

      <form>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Filename:
          <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
        </label>
        <br />
        <label>
  File ID:
  <input type="text" value={fileID} onChange={(e) => setFileID(e.target.value)} />
</label>
<br/>
        <label>
          Choose File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="button" onClick={handleGenerateHashClick}>
          Generate Instant Hash
        </button>
        <br />
        {instantHash && (
          <div>
            <h4>Instant Hash:</h4>
            <p>{instantHash}</p>
            <button type="button" onClick={handleCheckOriginalityClick}>
              Check Originality
            </button>
            {verificationResult && (
               <div className={`blinking-outline ${verificationResult === 'Content not modified' ? 'green' : 'red'}`}>
                {verificationResult}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
   
  );
};

export default VerifyPage;
