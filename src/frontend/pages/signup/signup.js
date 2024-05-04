import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regnum, setRegnum] = useState('');
  const [pass, setPass] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/Endosignup/signup', {
        name,
        email,
        regnum: parseInt(regnum),
        pass,
        
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      toast.success('Successfully registered! Please check your email for verification.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setName('');
      setEmail('');
      setRegnum('');
      setPass('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const errorMessage = error.response.data.error;
  
        // Display different alert messages based on the server response
        if (errorMessage.includes('Email, Register Number, and Password')) {
          alert('Email, Register Number, and Password already exist!');
        } else if (errorMessage.includes('Email and Register Number')) {
          alert('Email and Register Number already exist!');
        } else if (errorMessage.includes('Email and Password')) {
          alert('Email and Password already exist!');
        } else if (errorMessage.includes('Register Number and Password')) {
          alert('Register Number and Password already exist!');
        } else if (errorMessage.includes('Email')) {
          alert('Email already exists!');
        } else if (errorMessage.includes('Register Number')) {
          alert('Register Number already exists!');
        } else if (errorMessage.includes('Password')) {
          alert('Password already exists!');
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <ToastContainer />

        <div className={styles.left}>
          <h1>Welcome!</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign In
            </button>
          </Link>
        </div>

        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSignup}>
            <h1>Create Your Account</h1>

            <input
              type="text"
              placeholder="Username"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />

            <input
              type="text"
              placeholder="College Register Number"
              name="reg_num"
              value={regnum}
              onChange={(e) => setRegnum(e.target.value)}
              required
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              name="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className={styles.input}
            />

            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
