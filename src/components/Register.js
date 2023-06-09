import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link, useNavigate } from 'react-router-dom';
import whiteLogo from '../drivcon_white.png';
import logo from '../drivcon_logo.png';

const firebaseConfig = {
    apiKey: 'AIzaSyB7tlY9bDGWxRPVTcPlZ8WbjMMyunIb5vE',
    authDomain: 'drivcon-f00f7.firebaseapp.com',
    projectId: 'drivcon-f00f7',
    // ... other Firebase configurations
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Register = () => {
    const [signupFName, setSignupFName] = useState('');
    const [signupLName, setSignupLName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const navigate = useNavigate();

    // Handle chages in form fields
    const handleSignupFNameChange = (e) => {
        setSignupFName(e.target.value);
    }

    const handleSignupLNameChange = (e) => {
        setSignupLName(e.target.value);
    }

    const handleSignupEmailChange = (e) => {
        setSignupEmail(e.target.value);
    };

    const handleSignupPasswordChange = (e) => {
        const input = e.target.value;
        if (/^\d{0,6}$/.test(input)) { // Check if input is a number with max 6 digits
            setSignupPassword(input);
        }
    };

    const handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        // Prevent non-digit character input
        if (charCode < 48 || charCode > 57) {
          e.preventDefault();
        }
      };

      const handleSignUp = (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        firebase
        .auth() // Get the Firebase authentication service
        .createUserWithEmailAndPassword(signupEmail, signupPassword) // Create a new user with the provided email and password
        .then((userCredential) => {
            // This block is executed when the user is successfully created
            const user = userCredential.user; // The user's data
            console.log('Signed up:', user); // Log the user's data to the console
    
            // Update the user's display name with the entered first and last names
            user.updateProfile({
                displayName: signupFName + ' ' + signupLName,
          });
    
            // Navigate to the login page
            navigate('/login');
        })
        .catch((error) => {
            // This block is executed if there's an error creating the user
            console.error(error); // Log the error to the console
        });
    };

    return (
        <div className='Auth'>
            <div className='authFormContainer'>
                <p className='authText'>WELCOME TO</p>
                <img src={logo} className='logoAuth'></img>
                <p className='authText2'>Register to get updates and monitor every patient's IV fluid status.</p>
                <form onSubmit={handleSignUp}>
                    <div>
                        <input
                            className="formAuth"
                            type="text"
                            value={signupFName}
                            onChange={handleSignupFNameChange}
                            placeholder='First name'
                        />
                    </div>
                    <div>
                        <input
                            className="formAuth"
                            type="text"
                            value={signupLName}
                            onChange={handleSignupLNameChange}
                            placeholder='Last name'
                        />
                    </div>
                    <div>
                        <input
                            className="formAuth"
                            type="email"
                            value={signupEmail}
                            onChange={handleSignupEmailChange}
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            className="formAuth"
                            type="password"
                            pattern="\d{6}"
                            value={signupPassword}
                            onChange={handleSignupPasswordChange}
                            onKeyPress={handleKeyPress}
                            placeholder='Pin Code'
                        />
                    </div>
                    <button className='authButton' type="submit">REGISTER</button>
                </form>
                <p>Have an account already? <Link className='authLink' to={'/login'}>Log in</Link></p>
            </div>
            <div className='authBG'>
                <img src={whiteLogo} alt='white-logo' className='logoAuth2'></img>
                <p className='authText3'>Get convenience for infusion monitoring. Designed for nurses to easily track their patient's IV fluid status.</p>
            </div>
        </div>
    );
};

export default Register;
