import React, { useState, useRef } from 'react';
import './sup.css';
import Sidebar from "../sidebar2/sidebar2";
import { useNavigate } from 'react-router-dom';

function Uploadfiles() {
  const fileInput = useRef();
  const cloudFileInput = useRef()
  const [fname, setFname] = useState('');
  const [domain, setDomain] = useState('');
  const [descrip, setDesc] = useState('');
  const [urd, setUrd] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [cfname, setCfname] = useState('');

 



  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data enters!");

    const formData = new FormData();

    formData.append('file', fileInput.current.files[0]);
    formData.append('urd', urd);
    formData.append('fname', fname);
    formData.append('domain', domain);
    formData.append('descrip', descrip);
    const keywordsArray = keywords.split(',').map((keyword) => keyword.trim());
    formData.append('keywords', JSON.stringify(keywordsArray));

    const formDataArray = Array.from(formData.entries());
    console.log(formDataArray);

    try {
      const response = await fetch('http://localhost:8080/Simupload/upload', {
        method: 'POST',
        body: formData,
      });
      console.log(formData);

      if (response.ok) {
        alert('File Successfully Uploaded!!');
        //resetting the contents
        setUrd('');
        setFname('');
        setDomain('');
        setDesc('');
        setKeywords('');
        fileInput.current.value = null;
      } else {
        console.log('error occurred during upload', await response.text());
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', cloudFileInput.current.files[0]);
    formData.append('filename', cfname);
    try {
      const response = await fetch('http://localhost:8080/Simupload/cloudinaryUpload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File Successfully Uploaded to Cloudinary!!');
        setCfname(''); // Reset filename input
      } else {
        console.log('error occurred during Cloudinary upload', await response.text());
      }
    } catch (err) {
      console.log(err.message);
    }
  };



  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="grand-page">
          <div className="form-container">
            <h1 className="upload-heading">**** Upload your Files ****</h1>

            <form onSubmit={onSubmit} encType="multipart/form-data">
              <label className="input-label">Enter the User Recognition ID:</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your User Recognition ID:"
                name="urd"
                value={urd}
                onChange={(e) => setUrd(e.target.value)}
              />
              <br></br>
              <br></br>

              <p class="note">Note: Filename - URD-DomainName-DocumentName</p>
              <label className="input-label">Enter the Filename:</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter the filename"
                name="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <br></br>
              <br></br>
              <label className="input-label">Enter the Domain Name:</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your project domain..."
                name="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <br></br>
              <br></br>
              <label className="input-label">File Description</label>
              <textarea
                type="text"
                className="input-field description"
                name="descrip"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={descrip}
                placeholder="Description of your project..."
                rows={4}
                cols={40}
              />
              <br></br>
              <br></br>
              <label className="input-label">Choose your File:</label>
              <input type="file" name="file" ref={fileInput} />

              <br></br>
              <label className="input-label">Enter Keywords:</label>
              <textarea
                type="text"
                className="input-field"
                name="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords for the file..."
                rows={4}
                cols={40}
              />
              <br></br>

              <button type="submit" className="upload-button">
                Upload File
              </button>

                <h3>*** Uploading for Cloud Storage ***</h3>
              <br></br>
              <br></br>
              <label className="input-label">Choose your File:</label>
              <input type="file" name="cloudFile" ref={cloudFileInput} />
            <br>
            </br>
            <br>
            </br>
            <label className="input-label">Enter the Filename for Cloudinary:</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter the filename for Cloudinary"
                name="cloudFilename"
                value={cfname}
                onChange={(e) => setCfname(e.target.value)}
              />
               <br></br>
              <button type="button" className="upload-button" onClick={uploadToCloudinary}>
                Upload to Cloud
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Uploadfiles;
