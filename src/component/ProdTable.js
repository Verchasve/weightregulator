//import  from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect , useContext } from 'react';
import axios from 'axios';
import '../App.css';
import Settings from '../settings';

const ProdTable = (props) => {

  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  //const location = useLocation();
  const {state} = useLocation();

  const selectedOperatorvalue = state?.selectedOperatorvalue ;
  const selectedBrandValue = state?.selectedBrandValue ;
  const selectedSizeValue = state?.selectedSizeValue ;
  const selectedLayerValue = state?.slelectedLayerValue;
  const selectedColorValue = state?.selectedColorValue;

  //const selectedBrandValue = brandLocation ? brandLocation.selectedBrandValue : '';

  console.log("selected Brand =", selectedBrandValue);


  //console.log("brandValue " + props.match.params.brand);
 

  useEffect(() => {

    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    };

    // Connect to the WebSocket server
    const socket = new WebSocket('ws://localhost:4001'); // Replace with your server address
    socket.onmessage = (event) => {
      setReceivedMessage(event.data);
      console.log(event);
    };

    // Set up event listeners
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };


    // socket.onclose = () => {
    //   console.log('Disconnected from WebSocket server');
    // };

    // Save the socket instance in the state
    setSocket(socket);
   

    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(intervalId);
      //socket.close();
    };
  }, []);

  let operator;
  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <>
      <body>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid title'>
            <a className='navbar-brand title' href='#'>
              <h1>WELCOME TO MP&AD ENTERPRISES</h1>
            </a>
          </div>
        </nav>


        <center>
          <div className='container my-3'>
            <div className='weight-container'>
              <label for='RealTimeweightScreen' className='weightScreen'>
                <input
                  type='text'
                  name='weight-screen'
                  id='weightScreen'
                  className='weightScreen'
                  placeholder='Tank Weight in Kg Screen'
                  value= {receivedMessage}
                  style={{
                    height: "2.5em",
                    fontSize: "2.5em",
                    fontWeight: "bolder",
                    textAlign: "center",
                    borderRadius: ".3em"
                  }}

                />
              </label>

              {/* <!-- Add button will turn Green every time whenb the weight get added and fed in the production table --> */}
              <button className='primary addBtn mx-2' id='ptAddBtn' onClick='AddRow()'>
                ADD
              </button>

              {/* <!-- By clicking on the Reject Button, The entries will turn red in the production table --> */}
              <button className='danger reject mx-2' id='ptReject'>
                Reject
              </button>

              <button className='btn-primary mx-2' onClick={() => navigate(-1)}>Back </button>
              <button className='mx-2' id='ptFinishBtn'>Finish</button>
            </div>

            <div className='my-3'>
              <div className='osdtTable'>
                <input
                  className='mx-2'
                  type='text'
                  value={selectedOperatorvalue}
                  id='print-op-name'
                  placeholder='Operator'
                  disabled
                />
                <input
                  className='mx-2'
                  type='text'
                  name=''
                  id='print-op-shift'
                  placeholder='Shift'
                  disabled
                />
                {/* <div>
                  <h2>Current Date:</h2>
                  <p>{currentDate}</p>
                </div> */}


                <input
                  className='mx-2'
                  type='text'
                  name=''
                  id='print-op-shift'
                  placeholder={currentDate}
                  disabled

                />

                <input
                  className='mx-2'
                  type='text'
                  name=''
                  id='print-op-shift'
                  placeholder={currentTime}
                  disabled

                />
                {/* <div>
                  <h2>Current Time:</h2>
                  <p>{currentTime}</p>
                </div> */}
              </div>
            </div>

            <div className='my-2'>
              <input
                className='mx-2'
                type='text'
                value= {selectedBrandValue} 
                id='print-brand'
                placeholder='Brand'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                value={selectedSizeValue}
                id='print-size'
                placeholder='Size'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                value={selectedLayerValue}
                id='print-layer'
                placeholder='Layer'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                value={selectedColorValue}
                id='print-color'
                placeholder='Colour'
                disabled
              />
            </div>
          </div>

          <div className="container">
            <div className='containerTable' id='productionTable'>
              <br />
              <table
                border='2'
                id='ptTable'
                className='table table-success table-striped'
              >
                <thead>
                  <tr>
                    <th scope='col' id='sName'>
                      Serial Number
                    </th>
                    <th scope='col'>UBIN</th>
                    <th scope='col'>Tank Weight</th>
                    <th scope='col'>Time</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div>
      <h1>WebSocket Client</h1>
      <div>
        <strong>Received Message:</strong> {receivedMessage}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>


        </center>
      </body>
    </>
  )
}


export default ProdTable;



