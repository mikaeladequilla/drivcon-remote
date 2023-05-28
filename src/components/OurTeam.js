import { Link } from 'react-router-dom';
import logo from '../drivcon_logo.png'
import dequilla from '../dev-imgs/dev-dequilla.jpg'

function OurTeam() {
    return (
        <div>
            <div className='Team'>
                <header className='team-header'>
                    <Link to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <li>
                        <ul><Link to='/our-team' className="link">Our Team</Link></ul>
                        <ul><Link to='/portal' className="link">Portal</Link></ul>
                    </li>
                </header>
                <div className='team-content'>
                    <div className='team-text'>
                        <h1>Our Team</h1>
                        <p>Meet the Drivcon Developers. Computer Engineering students from Technological Institute of the Philippines - Quezon City campus.</p>
                    </div>
                    <div className='team-images'>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src='../icons/male-icon.png' alt='Kyle Cabellon' className='team-icon'/>
                                <h3>Kyle Cabellon</h3>
                                <p>Some text...</p>
                            </div>
                            <div className='team-images-track'>
                                <p>System Administration</p>
                            </div>
                        </div>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src={dequilla} alt='Mikaela Dequilla' className='team-icon'/>
                                <h3>Mikaela Dequilla</h3>
                                <p>Some text...</p>
                            </div>
                            <div className='team-images-track'>
                                <p>System Administration</p>
                            </div>
                        </div>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src='../icons/male-icon.png' alt='Edilberto Mandia, Jr.' className='team-icon'/>
                                <h3>Edilberto Mandia, Jr.</h3>
                                <p>Some text...</p>
                            </div>
                            <div className='team-images-track'>
                                <p>Embedded Systems</p>
                            </div>
                        </div>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src='../icons/female-icon.png' alt='Noveloraine Kate Mira' className='team-icon'/>
                                <h3>Noveloraine Kate Mira</h3>
                                <p>Some text...</p>
                            </div>
                            <div className='team-images-track'>
                                <p>System Administration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <img src={logo} alt='drivcon' className='App-logo'/>
                <p>© Drivcon. 2023 All rights reserved.</p>
            </footer>
        </div>
    )
}

export default OurTeam;
