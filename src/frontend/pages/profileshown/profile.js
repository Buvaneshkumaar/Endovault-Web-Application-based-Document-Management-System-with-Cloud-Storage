// import React from 'react';
import './pro.css';

const UserDetails = ({ handleClose }) => {
  return (
    <div className='user-details-overlay'>
      <div className='user-details-container'>
        <div className='user-details-content'>
          {/* Display user details here */}
          {/* Example: */}
          <h2>User Details</h2>
          {/* Add your user details content here */}
          {/* Example: */}
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          {/* You can add more user details as needed */}
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
