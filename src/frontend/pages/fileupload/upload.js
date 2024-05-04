import React, { useState, useRef} from 'react';
import './uploadcss.css';
// import { ImFolderUpload } from 'react-icons/im';
import Sidebar from "../sidebar2/sidebar2";
import './uploadcss.css';
// import { FaHandshake } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate } from 'react-router-dom';
function Uploadfiles() {
  const fileInput = useRef();
  const [fname, setFname] = useState('');
  const [domain, setDomain] = useState('');
  const [descrip, setDesc] = useState('');
  const [urd, setUrd] = useState('');
  // const [selectedFile, setSelectedFile] = useState(null);
  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

  const handlePublicKeyChange = (e) => {
    const publicKeyFile = e.target.files[0];
    setPublicKeyFile(publicKeyFile);

    // Read the contents of the public key file
    const reader = new FileReader();
    reader.onload = (event) => {
      setPublicKey(event.target.result);
    };
    reader.readAsText(publicKeyFile);
  };
// const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);

  // };

  // const onUpload = async (e) => {

  //   e.preventDefault();//prevent Default submission
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //   // console.log(selectedFile);
  //     alert('File selected!');
  //   }

  //   };
   

    const downloadPublicKey = async () => {
      try {
        const response = await fetch('http://localhost:8080/Endovault/downloadPublicKey');
        if (response.ok) {
          const blob = await response.blob();
          const publicKeyText = await new Response(blob).text();
          const publicKeyFile = new File([publicKeyText], 'publicKey.pem', { type: 'text/plain' });
          setPublicKeyFile(publicKeyFile);
  
          // Create a temporary anchor element to trigger the download
          const url = window.URL.createObjectURL(publicKeyFile);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'publicKey.pem';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.log('Error downloading public key', await response.text());
        }
      } catch (err) {
        console.log(err.message);
      }
    };
   

  // const navigate=useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data enters!");


    const formData = new FormData();
    // formData.append('file', selectedFile);
    formData.append('file', fileInput.current.files[0]);
    formData.append('Urd', urd);
    formData.append('name', fname);
    formData.append('domain', domain);
    formData.append('descrip', descrip);
    

    // console.log('URD', urd);
    // console.log("Name", fname);
    // console.log("Domain:", domain);
    // console.log("Description:", descrip);
    // console.log("File Details:",selectedFile);

      // Create an array from the FormData entries and log it
      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);
    
    if (publicKey) {
      formData.append('publicKey', publicKey);
    } else {
      // Notify the user to download the public key first
      alert('Please download the public key before submitting the form.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/Endovault/submit', {
        method: 'POST',
        body: formData,
      });
      

      if (response.ok) {
        alert('File Successfully Encrypted and Uploaded!!');
        
      } else {
        console.log('error occured during upload', await response.text());
      }
    } catch (err) {
      console.log(err.message);
    }

  };

  return (
    <>
<div style={{ display: 'flex' }}>
<Sidebar/>
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
              <label className="input-label">Enter the Filename:</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter the filename"
                name="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <label className="input-label">Enter the Domain Name:</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your project domain..."
                name="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
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
              <label className="input-label">Choose your File:</label>
              <input type="file" name="file"  ref={fileInput} />
              <br></br>

              {/* <label className="input-label">Check file selection:</label> 
              <button type="button" onClick={onUpload} >
               check file selection
              </button> */}

              <br></br>
              

              <button type="button" onClick={downloadPublicKey} className="download-key-button">
                Download Public Key
              </button>
              <br></br>
              
              <label className="input-label">Choose Public Key:</label>
              <input type="file" name="publicKey" onChange={handlePublicKeyChange} />
              <br></br>
            
              <button type="submit" className="upload-button">
                Secure and Store
              </button>
            </form>
          </div>
        </div>
        </div>

    </>
  )


}
export default Uploadfiles;
