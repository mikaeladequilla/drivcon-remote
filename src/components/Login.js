import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../drivcon_logo.png';
import whiteLogo from '../drivcon_white.png';

// Firebase configuration for your application
const firebaseConfig = {
    apiKey: 'AIzaSyB7tlY9bDGWxRPVTcPlZ8WbjMMyunIb5vE',
    authDomain: 'drivcon-f00f7.firebaseapp.com',
    projectId: 'drivcon-f00f7',
    // ... other Firebase configurations
};

// Initialize Firebase if it hasn't been already
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Login component
const Login = ({ onLogin }) => {
    // State variables for login form inputs and error messages
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // useNavigate hook to allow for redirection after successful login
    const navigate = useNavigate();

    // Listen for changes in the user's authentication state
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // If a user is logged in, run the onLogin function and redirect to the portal page
                onLogin();
                navigate('/portal');
            }
        });

        // Clean up the subscription to prevent memory leaks
        return () => unsubscribe();
    }, [navigate, onLogin]);

    // Handle form input changes to update state variables
    const handleLoginEmailChange = (e) => setLoginEmail(e.target.value);
    const handleLoginPasswordChange = (e) => {
        const input = e.target.value;
        if (/^\d{0,6}$/.test(input)) {
            setLoginPassword(input);
        }
    };
    const handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode < 48 || charCode > 57) {
          e.preventDefault();
        }
    };

    // Handle form submission for login
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        firebase
            .auth() // Get the Firebase authentication service
            .signInWithEmailAndPassword(loginEmail, loginPassword) // Sign in the user with the provided email and password
            .then((userCredential) => {
                // This block is executed when the login is successful
                const user = userCredential.user;
                console.log('Logged in:', user);
                onLogin();
                navigate('/portal');
            })
            .catch((error) => {
                // This block is executed if there's an error during login
                console.error(error);
                setLoginError('Invalid email or password. Please try again.');
            });
    };

    return (
        <div className='Auth'>
            <div className='authFormContainer'>
            <p className='authText'>WELCOME TO</p>
                <img src={logo} className='logoAuth' alt='logo'></img>
                <p className='authText2'>Login to get updates and monitor every patient's IV fluid status.</p>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            className="formAuth"
                            type="email"
                            value={loginEmail}
                            onChange={handleLoginEmailChange}
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            className="formAuth"
                            type="password"
                            pattern="\d{6}"
                            value={loginPassword}
                            onChange={handleLoginPasswordChange}
                            onKeyPress={handleKeyPress}
                            placeholder='Pin Code'
                        />
                    </div>
                    <button className='authButton' type="submit">LOG IN</button>
                </form>
                {loginError && <p className='authError'>{loginError}</p>}
                <p>Not yet registered? <Link className='authLink' to={'/register'}>Create an account</Link></p>
            </div>
            <div className='authBG'>
            <img src={whiteLogo} alt='white-logo' className='logoAuth2'></img>
                <p className='authText3'>Get convenience for infusion monitoring. Designed for nurses to easily track their patient's IV fluid status.</p>
            </div>
        </div>
    );
};

export default Login;
