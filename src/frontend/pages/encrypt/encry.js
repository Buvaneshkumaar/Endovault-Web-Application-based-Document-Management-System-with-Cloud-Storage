import React, { useRef, useState } from "react";
import "./encry.css";
import axios from "axios";

import { toast } from "react-toastify";
import Sidebar from "../sidebar2/sidebar2";

import "react-toastify/dist/ReactToastify.css";

const Encryfile = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [aesEncryptionFile, setAesEncryptionFile] = useState(null);
  const [rsaEncryptionFile, setRsaEncryptionFile] = useState(null);
  const [aesKeyForEncryption, setAesKeyForEncryption] = useState(null);

  const handleAESClick = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post("http://localhost:8080/Endo/aesencrypt", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.error) {
        console.error("Encryption failed:", response.data.error);
        toast.error("Encryption failed");
        return;
      }

      if (!response.data.file || !response.data.key) {
        console.error("Invalid response data:", response.data);
        toast.error("Invalid response data");
        return;
      }

      console.log("AES Key:", response.data.key);

      setAesEncryptionFile({
        file: response.data.file,
        key: response.data.key,
      });

      console.log("AES Encryption successful");

      setAesKeyForEncryption(response.data.key);
      window.alert("AES Encryption successful");
    } catch (err) {
      console.error("Encryption failed:", err);
      toast.error("Encryption failed");
    }
  };

  const handleServerHybridEncryptionClick = async () => {
    if (!aesKeyForEncryption) {
      console.log("AES key not received (from front)");
      return;
    }
    console.log("AES key received!");

    try {
      // Assuming aesEncryptionFile contains the encrypted file data and key
      const response = await axios.post(
        "http://localhost:8080/Endo/rsaserverencrypt",
        {
          encryptedFile: aesEncryptionFile.file,  // Pass the encrypted file data
          key: aesKeyForEncryption,  // Pass the AES key
        },
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const encryptedAesFile = new Uint8Array(response.data);

      setRsaEncryptionFile({ encryptedAesFile });
      console.log("RSA encryption successful");

      window.alert("RSA Encryption successful");
    } catch (err) {
      console.error("RSA encryption failed (from front):", err);
      toast.error("RSA Encryption Failed");
    }
  };


  const handleDownloadClick = () => {
    if (rsaEncryptionFile) {
      const blob = new Blob([rsaEncryptionFile.file], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "encrypted_file";
      link.click();

      window.alert("Download successful");
    }
  };

 
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
  };

  return (
<>
<div style={{ display: 'flex' }}>
    <Sidebar/>

    {/* <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
   */}


      <div class="backg">
    <div class="planet">
      <div class="r1"></div>
      <div class="r2"></div>
      <div class="r3"></div>
      <div class="r4"></div>
      <div class="r5"></div>
      <div class="r6"></div>
      <div class="r7"></div>
      <div class="r8"></div>
      <div class="shad"></div>
    </div>
    <div class="stars">
      <div class="s1"></div>
      <div class="s2"></div>
      <div class="s3"></div>
      <div class="s4"></div>
      <div class="s5"></div>
      <div class="s6"></div>
    </div>
    <div class="an">
      <div class="tank"></div>
      <div class="astro">
          
          <div class="helmet">
            <div class="glass">
              <div class="shine"></div>
            </div>
          </div>
          <div class="dress">
            <div class="c">
              <div class="btn1"></div>
              <div class="btn2"></div>
              <div class="btn3"></div>
              <div class="btn4"></div>
            </div>
          </div>
          <div class="handl">
            <div class="handl1">
              <div class="glovel">
                <div class="thumbl"></div>
                <div class="b2"></div>
              </div>
            </div>
          </div>
          <div class="handr">
            <div class="handr1">
              <div class="glover">
                <div class="thumbr"></div>
                <div class="b1"></div>
              </div>
            </div>
          </div>
          <div class="legl">
            <div class="bootl1">
              <div class="bootl2"></div>
            </div>
          </div>
          <div class="legr">
            <div class="bootr1">
              <div class="bootr2"></div>
            </div>
          </div>
          <div class="pipe">
            <div class="pipe2">
              <div class="pipe3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

          


    <div className="content-container" >
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          
          <span className="material-symbols-outlined"></span> Upload File
        </button>
      )}

      {selectedFile && (
        <>
          <div className="file-card">
            <span className="material-symbols-outlined icon"></span>

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>
              </div>
            </div>
          </div>
          <button className="encrypt-btn" onClick={handleAESClick}>
            Encrypt with AES
          </button>

          {aesEncryptionFile && (
            <button
              className="encrypt-btn"
              onClick={handleServerHybridEncryptionClick}
            >
              Hybrid Encryption
            </button>
          )}

          {rsaEncryptionFile && (
            <button className="download-btn" onClick={handleDownloadClick}>
              Download Encrypted File
            </button>
          )}
        </>
      )}
    </div>


    


    </div>
    
    
    </>
  );
};

export default Encryfile;
