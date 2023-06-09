import { Link } from 'react-router-dom';
import logo from '../drivcon_logo.png'
import cabellon from '../dev-imgs/dev-cabellon.jpg'
import dequilla from '../dev-imgs/dev-dequilla.jpg'
import mandia from '../dev-imgs/dev-mandia.jpg'
import mira from '../dev-imgs/dev-mira.jpg'

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
                                <img src={cabellon} alt='Kyle Cabellon' className='team-icon'/>
                                <h3>Kyle Cabellon</h3>
                                <p className='team-text2'>Implemented front-end functionality of the infusion pump system using PyQT5, enhancing user experience. Contributed to documentation, testing, experiments, and development to optimize system performance and reliability.</p>
                            </div>
                            <div className='team-images-track'>
                                <p>System Administration</p>
                            </div>
                        </div>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src={dequilla} alt='Mikaela Dequilla' className='team-icon'/>
                                <h3>Mikaela Dequilla</h3>
                                <p className='team-text2'>Integrated a remote monitoring system for the infusion pump, and assisted on hardware functionality. Utilized AutoCAD for precise 3D modeling for comprehensive architecture visualization and developed a front-end with ReactJS and Figma. Made contributions to design planning, documentation, and calibration.</p>
                            </div>
                            <div className='team-images-track'>
                                <p>System Administration</p>
                            </div>
                        </div>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src={mandia} alt='Edilberto Mandia, Jr.' className='team-icon'/>
                                <h3>Edilberto Mandia, Jr.</h3>
                                <p className='team-text2'>Responsible for hardware development primarily involves designing and implementing various components, such as sensors and cabling, to enhance system functionality. Contribute to the documentation process and aids in conducting experiments and tests for system development.</p>
                            </div>
                            <div className='team-images-track'>
                                <p>Embedded Systems</p>
                            </div>
                        </div>
                        <div className='team-member'>
                            <div className='team-images-box'>
                                <img src={mira} alt='Noveloraine Kate Mira' className='team-icon'/>
                                <h3>Noveloraine Kate Mira</h3>
                                <p className='team-text2'>Developed the project documentation, engaged in calibration and testing, established calculation for the main operation and actively contributed to every stage, refining its final functionality.</p>
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
