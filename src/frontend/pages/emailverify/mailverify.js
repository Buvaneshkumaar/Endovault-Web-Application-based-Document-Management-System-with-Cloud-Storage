import React, { useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Mailverify = () => {
  // const [activationComplete, setActivationComplete] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailURL = async () => {
      try {
        if (token) {
          const response = await axios.post('http://localhost:8080/Endoverify/activate-user', { token });

          if (response.status === 200) {
            // setActivationComplete(true);
            // // Navigate to the login page
            // navigate('/login');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyEmailURL();
  }, [token, navigate]);

  // const handleActivateUser = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/Endoverify/activate-user', { token });

  //     if (response.status === 200) {
  //       setActivationComplete(true);
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container">
      <img
  src="https://freerangestock.com/sample/51362/tick-success-means-succeed-progress-and-checkmark.jpg" 
  alt="Success"
  className="success_img"
/>
    </div>
  );
};

export default Mailverify;
