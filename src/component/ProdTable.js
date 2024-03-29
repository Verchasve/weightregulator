//import  from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import Settings from '../settings';
import md5 from 'md5';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProdTable = (props) => {

  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  //const location = useLocation();
  const { state } = useLocation();

  const [serialNumber, setSerialNumber] = useState(1); // Initialize serial number
  const [ubin, setUbin] = useState(''); // Unique Batch Identification Number
  //const [tankWeight, setTankWeight] = useState(''); // Tank Weight
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    border: '1px solid #ccc',
    marginBottom: '10px'
  };

  const items = Array.from({ length: 20 });

  const fetchMoreData = () => {
    // fetch more data here
  };



  // const selectedOperatorvalue = state?.selectedOperatorvalue;
  // const selectedBrandValue = state?.selectedBrandValue;
  // const selectedSizeValue = state?.selectedSizeValue;
  // const selectedLayerValue = state?.slelectedLayerValue;
  // const selectedColorValue = state?.selectedColorValue;
  //const selectedBrandValue = brandLocation ? brandLocation.selectedBrandValue : '';
  //console.log("selected Brand =", selectedBrandValue);

  //console.log("brandValue " + props.match.params.brand);




  useEffect(() => {

    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    };
    // Change done 05-02-2024


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

  // change done 05-02-2024 generate ubin code

  const generateUbin = () => {
    // Generate UBIN based on selected values and current data/time
    const selectedOperatorValue = state?.selectedOperatorvalue || '';
    const selectedBrandValue = state?.selectedBrandValue || '';
    const selectedSizeValue = state?.selectedSizeValue || '';
    const selectedLayerValue = state?.selectedLayerValue || '';
    const selectedColorValue = state?.selectedColorValue || '';
    // Combine selected values and current date/time to generate UBIN
    const combinedData = `${selectedOperatorValue}-${selectedBrandValue}-${selectedSizeValue}-${selectedLayerValue}-${selectedColorValue}-${receivedMessage}-${currentDate}-${currentTime}`;

    console.log("combinedData =", combinedData);

    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // const charactersLength = characters.length;
    //   for (let i = 0; i < 6; i++) {
    //      ubin += characters.charAt(Math.floor(Math.random() * charactersLength));
    //    }

    // Hash the combinedData to a unique alphanumeric string using md5
    const hashedData = md5(combinedData);
    console.log("hashedData", hashedData)

    // Extract the first six characters from the hashedData as the UBIN
    const ubin = hashedData.substring(0, 6);

    // Set the generated UBIN
    setUbin(combinedData);
    //setUbin(newUbin);

  };

  const handleSearch = () => {
    if (inputValue === ubin) {
      alert(`UBIN: ${generateUbin().combinedData}`);
    } else {
      alert('Invalid UBIN');
    }
  };


  const addRow = () => {
    // Add row to table when ADD button is clicked
    generateUbin();
    const newRow = {
      serialNumber: serialNumber,
      ubin: Date.parse(new Date),
      receivedMessage: receivedMessage,
      time: currentTime,
    };
    setTableData([...tableData, newRow]);
    setSerialNumber(serialNumber + 1); // Increment serial number
    setReceivedMessage(receivedMessage);
  };


  let operator;
  // const sendMessage = () => {
  //   if (socket && message) {
  //     socket.send(message);
  //     setMessage('');
  //   }
  // };

  const handleSave = () => {
    // Create an array to store table data objects
    const savedTableData = [];

    // Iterate through the tableData array and construct objects
    tableData.forEach((row) => {
      const rowData = {
        serialNumber: row.serialNumber,
        ubin: row.ubin,
        receivedMessage: row.receivedMessage,
        time: row.time,
      };

      savedTableData.push(rowData);
    });

    // Display the constructed object in the console
    console.log('Saved table Data:', savedTableData);
  };

  
  //Change

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
                  type="text"
                  placeholder="Enter UBIN"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="mx-3" onClick={handleSearch}>search</button>

                <input
                  type='text'
                  name='weight-screen'
                  id='weightScreen'
                  className='weightScreen'
                  placeholder='Tank Weight in Kg Screen'
                  value={receivedMessage}
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
              <button className='primary addBtn mx-2' id='ptAddBtn' onClick={addRow}>
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
                  value={state?.selectedOperatorvalue || ''}
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
                value={state?.selectedBrandValue || ''}
                id='print-brand'
                placeholder='Brand'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                value={state?.selectedSizeValue || ''}
                id='print-size'
                placeholder='Size'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                value={state?.selectedLayerValue || ''}
                id='print-layer'
                placeholder='Layer'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                value={state?.selectedColorValue || ''}
                id='print-color'
                placeholder='Colour'
                disabled
              />
            </div>
          </div>

          <div>
           

            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader to the top.
              inverse={true}
              hasMore={true}

              scrollableTarget="scrollableDiv"
            >
              <div className='containerTable' id='productionTable'>
                <br />
                <div className="table-responsive" style={style} >
                  <table
                    border='2'
                    id='ptTable'
                    className='table table-success table-striped'
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
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
                    <tbody>
                      {/* Display table data */}
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{row?.serialNumber}</td>
                          <td>{row?.ubin}</td>
                          <td>{row?.receivedMessage}</td>
                          <td>{row?.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </InfiniteScroll>

          </div>

          <div>
            <h1>WebSocket Client</h1>
            <div>
              <strong>Received Message:</strong> {receivedMessage}
            </div>
            <div>
              {/* <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              /> */}
              <button onClick={handleSave}>Save</button>
            </div>
          </div>


        </center>
      </body>
    </>
  )
}


export default ProdTable;

// improve the above code such that all the total added entries inside the table should get saved and converted in object displayed in the console when the save button is clicked

