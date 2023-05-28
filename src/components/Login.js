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

const Login = ({ onLogin }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLoginEmailChange = (e) => {
        setLoginEmail(e.target.value);
    };

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

    const handleLogin = (e) => {
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(loginEmail, loginPassword)
            .then((userCredential) => {
                // Handle successful login
                const user = userCredential.user;
                console.log('Logged in:', user);

                // Call the onLogin prop to update the parent component
                onLogin();

                // Navigate to the portal
                navigate('/portal');
            })
            .catch((error) => {
                // Handle login error
                console.error(error);
                setLoginError('Invalid email or password. Please try again.');
            });
    };

    return (
        <div className='Auth'>
            <div className='authFormContainer'>
            <p className='authText'>WELCOME TO</p>
                <img src={logo} className='logoAuth'></img>
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
