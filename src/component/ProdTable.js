//import  from 'react';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
 
import '../App.css';
 

 




export default function ProdTable() {

  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    };

    const intervalId = setInterval(updateDateTime, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  let operator

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
                  style = {{ 
                    height: "2.5em",
                    fontSize: "xx-large",
                    textAlign: "center",
                    borderRadius:".3em"
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
                  name=''
                  id='print-op-name'
                  placeholder={operator?.text}
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
                name=''
                id='print-brand'
                placeholder='Brand'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                name=''
                id='print-size'
                placeholder='Size'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                name=''
                id='print-layer'
                placeholder='Layer'
                disabled
              />
              <input
                className='mx-2'
                type='text'
                name=''
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
                      #
                    </th>
                    <th scope='col'>UBIN</th>
                    <th scope='col'>Tank Weight</th>
                    <th scope='col'>Time</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </center>
      </body>
    </>
  )
}
