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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Register = () => {
    const [signupFName, setSignupFName] = useState('');
    const [signupLName, setSignupLName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const navigate = useNavigate();

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
        if (/^\d{0,6}$/.test(input)) {
            setSignupPassword(input);
        }
    };

    const handleKeyPress = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode < 48 || charCode > 57) {
          e.preventDefault();
        }
      };

    const handleSignUp = (e) => {
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(signupEmail, signupPassword)
        .then((userCredential) => {
            // Handle successful sign-up
            const user = userCredential.user;
            console.log('Signed up:', user);

            // Update user's display name with the combined first and last name
            user.updateProfile({
                displayName: signupFName + ' ' + signupLName,
          });

            // Navigate to the portal
            navigate('/login');
        })
        .catch((error) => {
            // Handle sign-up error
            console.error(error);
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
