import React from 'react'
import {useNavigate} from "react-router-dom"
import '../App.css';


export default function ProdTable () {

  const navigate = useNavigate();

  
  return (
    <>
      <body onload="updateClock(); setInterval('updateClock()', 1000), updateDate(); setInterval('updateDate()',10000)">
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div class='container-fluid title'>
            <a class='navbar-brand title' href='#'>
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
          <div class='container my-3'>
            <div class='weight-container'>
              <label for='RealTimeweightScreen' class='weightScreen'>
                <input
                  type='text'
                  name='weight-screen'
                  id='weightScreen'
                  class='weightScreen'
                  placeholder='Tank Weight in Kg Screen'
                />
              </label>

              {/* <!-- Add button will turn Green every time whenb the weight get added and fed in the production table --> */}
              <button class='addBtn' id='ptAddBtn' onclick='AddRow()'>
                ADD
              </button>

              {/* <!-- By clicking on the Reject Button, The entries will turn red in the production table --> */}
              <button class='reject' id='ptReject'>
                Reject
              </button>

              <button onClick={() => navigate(-1)}>Back </button>
              <button id='ptFinishBtn'>Finish</button>
            </div>

            <div class='my-3'>
              <div class='osdtTable'>
                <input
                  type='text'
                  name=''
                  id='print-op-name'
                  placeholder='Operator Name'
                  disabled
                />
                <input
                  type='text'
                  name=''
                  id='print-op-shift'
                  placeholder='Shift'
                  disabled
                />

                {/* <!-- <div class="dateClock"
                         onload="updateClock(); setInterval('updateClock()', 1000), updateDate(); setInterval('updateDate()',10000)">
                        <div id="clock"
                             onload="updateClock();"></div>
                        <div id="date"
                             onload="updateDate();"></div> --> */}
              </div>
            </div>

            <div class='my-2'>
              <input
                type='text'
                name=''
                id='print-brand'
                placeholder='Brand'
                disabled
              />
              <input
                type='text'
                name=''
                id='print-size'
                placeholder='Size'
                disabled
              />
              <input
                type='text'
                name=''
                id='print-layer'
                placeholder='Layer'
                disabled
              />
              <input
                type='text'
                name=''
                id='print-color'
                placeholder='Colour'
                disabled
              />
            </div>
          </div>

          <div class='containerTable' id='productionTable'>
            <br />
            <table
              border='2'
              id='ptTable'
              class='table table-success table-striped'
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
