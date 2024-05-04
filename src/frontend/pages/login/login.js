import React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/Endoauth/login", {
                email: email,
                pass: pass,
            });
    
            console.log(response);
    
            if (response.status === 200) {
                alert("Login successful");
                navigate("/show");
                setEmail("");
                setPass("");
            } else if (response.status === 401) {
                alert("Invalid password");
            } else if (response.status === 404) {
                alert("User not found");
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.log(err);
            alert("Check the login credentials!!!");
        }
    };

    return (

        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login Your Account</h1>



                        <input
                            type="text"
                            placeholder='Email ID'
                            name='email'
                            onChange={(e) => {
                                // Clear all fields when any field changes (this may not be the desired behavior)
                                setEmail(e.target.value); // Set only the 'name' field
                            }}
                            value={email}
                            required
                            className={styles.input} />






                        <input
                            type="text"
                            placeholder='Password'
                            name='pass'
                            onChange={(e) => {
                                // Clear all fields when any field changes (this may not be the desired behavior)
                                setPass(e.target.value); // Set only the 'name' field
                            }}
                            value={pass}
                            required
                            className={styles.input} />

                        {/* google_login */}

                        <GoogleOAuthProvider clientId="913271782373-ph3nudp7k9djgg49vq8v9deafpokg72d.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    const details = jwt_decode(credentialResponse.credential);
                                    console.log(details);
                                    console.log(credentialResponse);
                                    navigate('/show');
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider>


                        <button type="submit" className={styles.green_btn}>
                            <span>Sign In </span>
                        </button>

                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Are you new ?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>


                </div>
            </div>
        </div>
    )
};


export default Login;