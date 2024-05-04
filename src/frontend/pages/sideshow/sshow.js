import React from 'react';
import Sidebar from '../sidebar2/sidebar2';
import { FaBolt, FaFileUpload, FaLock, FaEye, FaCheck, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import './show.css'; // Add your CSS file for styling

const Sideshow = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="content-container">
          <div className="intro-text">
            <p>
              Welcome to our secure encrypted document storage application.
              <br />
              <br></br>
              Your data is safe and easily accessible whenever you need it.
            </p>
          </div>
          <br></br>
          <br></br>
          <div className="feature-section">
            <div className="feature-item">
              <FaBolt className="icon" />
              <p className="blinking-text">Easy Access</p>
            </div>
            <div className="feature-item">
              <FaFileUpload className="icon" />
              <p className="blinking-text">Easy Manage</p>
            </div>
            <div className="feature-item">
              <FaLock className="icon" />
              <p className="blinking-text">Easy to Secure</p>
            </div>
            <div className="feature-item">
              <FaEye className="icon" />
              <p className="blinking-text">Good Experience</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="roadmap-section">
            <h2 className='head'>User Guidance</h2>
            <br></br>
              <br></br>
            <ul>
              <li>
                <FaChartLine className="roadmap-icon" />
                <span className="blinking-text">Frequency Extract - Step 1 - Use your file to extract keywords for your convenient file search</span>
              </li>
              <br></br>
              <br></br>
              <li>
                <FaFileUpload className="roadmap-icon" />
                <span className="blinking-text">Upload File - step 2 - Upload and Store your files which will encrypted over 2 level layer</span>
              </li>
              <br></br>
              <br></br>
              <li>
                <FaLock className="roadmap-icon" />
                <span className="blinking-text">Hash Files - Step 3 - Hash the contents of your file to ensure its integrity</span>
              </li>
              <br></br>
              <br></br>
              <li>
                <FaEye className="roadmap-icon" />
                <span className="blinking-text">View Files - Step 4 - View your files which are stored in the Database</span>
              </li>
              <br></br>
              <br></br>
              <li>
              
                <FaCheck className="roadmap-icon" />
                <span className="blinking-text">Check Originality - Step 5 - Check with your Stored files for its originality</span>
              </li>
              <br></br>
              <br></br>
              <li>
                <FaChartLine className="roadmap-icon" />
                <span className="blinking-text">Report Generation -  Step 6 - Generate and see your number of files and domains</span>
              </li>
              <br></br>
              <br></br>
              <li>
                <FaCheckCircle className="roadmap-icon" />
                <span className="blinking-text">Process Completed - Congratulations *** We here to manage your file ***</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sideshow;
