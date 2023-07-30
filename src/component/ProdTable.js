import React from 'react'
import {useNavigate} from "react-router-dom"
import '../App.css';


export default function ProdTable () {

  const navigate = useNavigate();

  
  return (
    <>
      <body onload="updateClock(); setInterval('updateClock()', 1000), updateDate(); setInterval('updateDate()',10000)">
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid title'>
            <a className='navbar-brand title' href='#'>
              <h1>WELCOME TO MP&AD ENTERPRISES</h1>
            </a>
          </div>
        </nav>
        {/* <!-- <div id="clock"></div>
    <div id="date">
        <div onload="updateDate();"></div>
    </div> -->
    <!-- <script src="clock.js"></script> --> */}

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
                />
              </label>

              {/* <!-- Add button will turn Green every time whenb the weight get added and fed in the production table --> */}
              <button className='addBtn mx-2' id='ptAddBtn' onClick='AddRow()'>
                ADD
              </button>

              {/* <!-- By clicking on the Reject Button, The entries will turn red in the production table --> */}
              <button className='reject mx-2' id='ptReject'>
                Reject
              </button>

              <button className='mx-2' onClick={() => navigate(-1)}>Back </button>
              <button className='mx-2' id='ptFinishBtn'>Finish</button>
            </div>

            <div className='my-3'>
              <div className='osdtTable'>
                <input
                className='mx-2'
                  type='text'
                  name=''
                  id='print-op-name'
                  placeholder='Operator Name'
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

                {/* <!-- <div className="dateClock"
                         onload="updateClock(); setInterval('updateClock()', 1000), updateDate(); setInterval('updateDate()',10000)">
                        <div id="clock"
                             onload="updateClock();"></div>
                        <div id="date"
                             onload="updateDate();"></div> --> */}
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
        </center>
      </body>
    </>
  )
}
