import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import nurse from "../nurse.png";
import logo from '../drivcon_logo.png';

function Home() {

    return (
        <div>
            <div className="Home">
                <li>
                    <ul><Link to='/our-team' className="link">Our Team</Link></ul>
                    <ul><Link to='/portal' className="link">Portal</Link></ul>
                </li>
                <div className="home-content">
                    <div className="home-text">
                        <p className="home-header">Get convenience for infusion monitoring.</p>
                        <p className="home-par">Designed for nurses to easily track their patient’s IV fluid status.</p>
                        <Link to="/portal"><Button className="portal-btn">Try it now</Button></Link>
                    </div>
                    <img src={nurse} className="nurse" alt="nurse"></img>
                </div>
            </div>
            <footer>
                <img src={logo} alt='drivcon' className='App-logo'/>
                <p>© Drivcon. 2023 All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;