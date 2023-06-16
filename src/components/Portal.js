import { Button, Modal, FormControl } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import logo from '../drivcon_icon.png';
import '../App.css';

const firebaseConfig = {
  apiKey: "AIzaSyB7tlY9bDGWxRPVTcPlZ8WbjMMyunIb5vE",
  authDomain: "drivcon-f00f7.firebaseapp.com",
  databaseURL: "https://drivcon-f00f7-default-rtdb.firebaseio.com",
  projectId: "drivcon-f00f7",
  storageBucket: "drivcon-f00f7.appspot.com",
  messagingSenderId: "1080917430040",
  appId: "1:1080917430040:web:088b08e0139201a67e986d"
};


firebase.initializeApp(firebaseConfig);

function Portal() {
  const [infusions, setInfusions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [messageKey, setMessageKey] = useState(null);
  const [warningType, setWarningType] = useState({ airInLine: false, blood: false });
  const [difference, setDifference] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Attach a listener for changes to the "infusions" node
    const infusionsRef = firebase.database().ref('infusions');
    infusionsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const infusions = Object.entries(data || {})
        .filter(([key, value]) => !value.dummy) // Filter out dummy values
        .map(([key, value]) => ({
          id: key,
          bed_number: value.bed_number,
          fluid_type: value.fluid_type || '',
          total_volume: value.total_volume + " mL" || '',
          infusion_rate: value.infusion_rate + " mL" || '',
          total_time: value.total_time + " hrs." || '',
          total_difference: value.total_difference
        }));
      setInfusions(infusions);
    });

    // Attach a listener for changes to the "messages" node
    const messagesRef = firebase.database().ref('events');
    messagesRef.on('value', (snapshot) => {
      const messageObj = snapshot.val();
      if (messageObj) {
        const filteredMessageObj = Object.entries(messageObj || {})
        .filter(([key, value]) => !value.dummy) // Filter out dummy values
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      if (Object.keys(filteredMessageObj).length > 0) {
        const key = Object.keys(filteredMessageObj)[0];
        const message = filteredMessageObj[key].message;

        setWarningType({
          airInLine: message.toLowerCase().includes("air-in-line"),
          blood: message.toLowerCase().includes("blood"),
        });

        setMessageKey(key);
        setModalMessage(message.replace(/\n/g, " "));
        setShowModal(true);
      }
    }
    });
    
    // Attach a listener for changes to the "messages" node
    const differenceRef = firebase.database().ref('difference');
    differenceRef.on('child_added', (snapshot) => {
      const latestDifferenceValue = snapshot.val();
      setDifference(latestDifferenceValue.total_difference);
    });

    // Detach the listener when the component unmounts
    return () => {
      infusionsRef.off();
      messagesRef.off();
      differenceRef.off();
    }
  }, []);

  const handleRowClick = (infusion) => {
    setSelectedRow(infusion);
  };

  const handleRemoveInfusion = () => {
    if (selectedRow) {
      const infusionRef = firebase.database().ref(`infusions/${selectedRow.id}`);
      infusionRef.remove();
      setSelectedRow(null);
    }
  };
    
  const handleCloseModal = () => {
    if (messageKey) {
      const messageRef = firebase.database().ref(`events/${messageKey}`);
  
      // Check if the current message is the last one in the "events" node
      const messagesRef = firebase.database().ref('events');
      messagesRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const filteredData = Object.entries(data || {}).filter(([key]) => key !== messageKey);
  
        if (filteredData.length === 0) {
          // If it is the last message, update it to a dummy value instead of removing
          messageRef.set({ dummy: true });
        } else {
          // If it is not the last message, remove it as usual
          messageRef.remove();
        }
      });

      // Check if the current message is the last one in the "difference" node
      const differenceRef = firebase.database().ref('difference');
      differenceRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const filteredData = Object.entries(data || {}).filter(([key]) => key !== messageKey);

        if (filteredData.length === 0) {
          // If it is the last data, update it to a dummy value instead of removing
          differenceRef.child(messageKey).set({ dummy: true });
        } else {
          // If it is not the last data, remove it as usual
          differenceRef.child(messageKey).remove();
        }
      });

      // Remove the previous 'difference' child
      const prevDifferenceKey = messageKey;
      const prevDifferenceRef = firebase.database().ref(`difference/${prevDifferenceKey}`);
      prevDifferenceRef.remove();
  
      setMessageKey(null);
    }
    setShowModal(false);
    setModalMessage("");
    setWarningType({ airInLine: false, blood: false }); // Reset warningType
  };

  const getAlertImage = (message) => {
    if (message.toLowerCase().includes("air-in-line")) {
      return '/icons/icon-bubbles.png';
    }
    if (message.toLowerCase().includes("blood")) {
      return '/icons/icon-blood.png';
    }
    return null;
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            navigate("/login");
        })
        .catch((error) => {
            // An error happened.
            console.error(error);
        });
};

  const filterInfusions = (infusion) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      infusion.fluid_type.toLowerCase().includes(query) ||
      infusion.total_volume.toLowerCase().includes(query) ||
      infusion.infusion_rate.toLowerCase().includes(query) ||
      infusion.total_time.toLowerCase().includes(query) ||
      infusion.bed_number.toString().toLowerCase().includes(query) ||
      (infusion.total_difference && infusion.total_difference.toString().toLowerCase().includes(query))
    );
  };

  const filteredInfusions = infusions.filter(filterInfusions);

  return (
    
    <div className='App'>
      <header className='App-header'>
        <div className='header-portal'>
          <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <Button className='logout-button' onClick={handleLogout}>SIGN OUT</Button>
        </div>
        <p>Infusion Monitoring Portal</p>
        <div className='alert-container'>
          <div className='alert-card first-alert-card'>
            <div className={`alert-ind ${warningType.airInLine ? 'warning-text' : 'normal-text'}`}>
              <p>{warningType.airInLine ? 'Bubble detected' : 'Normal'}</p>
              <p className='alert-text'>Air-in-line</p>
            </div>
            <img src='/icons/icon-bubbles.png' alt='bubbles' className={`alert-ind ${warningType.airInLine ? 'warning-img' : 'normal-img'}`}></img>
          </div>
          <div className='alert-card'>
            <div className={`alert-ind ${warningType.blood ? 'warning-text' : 'normal-text'}`}>
              <p>{warningType.blood ? `Blood detected` : 'Normal'}</p>
              <p className='alert-text'>Reverse blood flow</p>
            </div>
            <img src='/icons/icon-blood.png' alt='blood' className={`alert-ind ${warningType.blood ? 'warning-img' : 'normal-img'}`}></img>
          </div>
        </div>
        <div className='App-control'>
          <FormControl className='App-search'
            placeholder='Search'
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className='Remove-button' onClick={handleRemoveInfusion}>REMOVE</Button>
    </div>
        <div className='infusion-container'>
          {filteredInfusions.length === 0 ? (
            <div className='no-data-con'>
              <img className='no-data-pic'src='/icons/icon-nodata.png' alt='no data'></img>
              <p className='no-data'>No data available</p>
            </div>
          ) : (
          <div className='table-hover'>
            {infusions.filter(filterInfusions).map((infusion) => {
              return (
                <div key={infusion.id} className={`table-body ${selectedRow === infusion ? 'selected-row' : ''}`} onClick={() => handleRowClick(infusion)}>
                  <div className='bedNumber-text'>Bed No: {infusion.bed_number}</div>
                  <div className='fluidType-text'>{infusion.fluid_type}</div>
                  <div className='text-text'>{infusion.total_volume}</div>
                  <div className='text-text'>{parseFloat(infusion.infusion_rate).toFixed(2)}</div>
                  <div className='totalTime-text'>{infusion?.total_time}</div>
                </div>
              )
            })}
          </div>
          )}
        </div>
      </header>

      {selectedRow && (
      <div className='section'>
            <div className='other-text'>
              <p className='bed-number'>Bed Number: {selectedRow.bed_number}</p>
              <p className='infusing'>Infusing</p>
              <p className='Fluid-type'>{selectedRow.fluid_type}</p>
            </div>
            <div className='Flow-rate'>
              <div className='flowrate-text'>
              <p className='flowrate-data'>{difference}</p>
                <p>{selectedRow.infusion_rate.split(' ')[1]}</p>
              </div>
              <p>Flow Rate</p>
            </div>
            <div className='data-cards'>
              <div className='card'>
                <img src='/icons/icon-syringe.png' alt='syringe-icon'></img>
                <p className='other-text'>{selectedRow.total_volume.split(' ')[0]} mL</p>
                <p className='below-text'>VTBI</p>
              </div>
              <div className='card'>
                <img src='/icons/icon-timer.png' alt='syringe-icon'></img>
                <p className='other-text'>{parseFloat(selectedRow.infusion_rate.split(' ')[0]).toFixed(2)} mL/hr</p>
                <p className='below-text'>Flow Rate</p>
              </div>
              <div className='card'>
                <img src='/icons/icon-soon.png' alt='syringe-icon'></img>
                <p className='other-text'>
                  {selectedRow.total_time.split(' ')[0]} {selectedRow.total_time.split(' ')[0] === '1' ? 'hr' : 'hrs'}.
                </p>
                <p className='below-text'>Total Time</p>
              </div>
            </div>
      )
      {!selectedRow && (
      <div className='section hide'></div>
        )}
      </div>
      )};
      <div className={showModal ? 'overlay' : ''}></div> {/* Add the overlay div */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className='modal-container'>
        <Modal.Body>
          {getAlertImage(modalMessage) && (
            <img src={getAlertImage(modalMessage)} alt='alert' />
          )}
            <p className='warning-modal'>WARNING!</p>
            {JSON.stringify(modalMessage)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Okay</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Portal;