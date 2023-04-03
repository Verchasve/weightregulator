import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import './OperationPanel.css'

import List from './List'
import withListLoading from './withListLoading'

const Settings = require('../settings')

const OperationPanel = () => {
  const navigate = useNavigate()

  const ListLoading = withListLoading(List)

  const [appState, setAppState] = useState({
    loading: false,
    repos: null
  })

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrl = `${Settings.serviceHost}:${Settings.servicePort}/getData`
    fetch(apiUrl)
      .then(res => res.json())
      .then(users => {
        setAppState({ loading: false, users: users })
      })
  }, [setAppState])

  return (

    <>
      
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className=''>
            <a
              className='navbar-brand title'
              href='#'
              style={{ color: 'white' }}
            >
              <h1>Select The Production Parameters</h1>
            </a>
          </div>
        </nav>
        <div >
        <div className='App'>
          <header className='App-header'>
            <h1 style={{ color: 'yellow' }}>Welcome To Operation Panel </h1>
            <div className='App'>
              {/* <div className='container'>
			<h1>User DB Collection</h1>
		</div> */}
              <div className='repo-container'>
                {/* <ListLoading
                isLoading={appState.loading}
                users={appState.users}
              /> */}

                <div>

                  <center>
                    <div className='op-sh-dt' >
                      <div className='mx-3 my-4 osd'>
                        <div className='osdMain'>
                          <label action='#'>
                            
                            Operator Name:
                            <select
                              name='operator-name'
                              id='operator-name'
                              className='form-select'
                              aria-label='Default select example'
                            >
                              <option
                                value='operator-present'
                                id='operatorPresent'
                              >
                                operator present
                              </option>
                              <option value='operator-1'>operator-1</option>
                              <option value='operator-2'>operator-2</option>
                              <option value='operator-3'>operator-3</option>
                            </select>
                          </label>
                        </div>
                        <div className='osdMain '>
                          <label action='#'>
                            Shift:{' '}
                            <input
                              type='text'
                              className='inputOsd'
                              name='shift-ag'
                              id='shift-ag'
                              disabled
                            />
                          </label>
                        </div>

                        <div className='osdMain mx-5'>
                          <label action='#' className='mx-4'>
                            Date:{' '}
                            <input
                              type='text'
                              className='inputOsd'
                              name='date-ag'
                              id='date-ag'
                              disabled
                            />
                          </label>
                        </div>
                      </div>
                    </div>


                    <div>
                      <div
                        className='br-si-la-co  mx-5 bslcEntryTable'
                        id='bslcWtEntryTable'
                      >
                        <div className='brand'>
                          <select
                            className='form-select'
                            aria-label='Default select example'
                          >
                            <option selected id='selectBrand'>
                              Select Brand
                            </option>
                            <option value='brand-1' id='brand-1'>
                              Brand-1
                            </option>
                            <option value='brand-2' id='brand-2'>
                              Brand-2
                            </option>
                            <option value='brand-3' id='brand-3'>
                              Brand-3
                            </option>
                          </select>
                        </div>
                        <div className='size'>
                          <select
                            className='form-select mx-2'
                            aria-label='Default select example'
                          >
                            <option selected>Select Size</option>
                            <option value='size-1' id='size-1'>
                              Size-1
                            </option>
                            <option value='size-2' id='size-2'>
                              Size-2
                            </option>
                            <option value='size-3' id='size-3'>
                              Size-3
                            </option>
                          </select>
                        </div>
                        <div className='layer'>
                          <select
                            className='form-select mx-3'
                            aria-label='Default select example'
                          >
                            <option selected>Select Layer</option>
                            <option value='layer-1' id='layer-1'>
                              Layer-1
                            </option>
                            <option value='layer-2' id='layer-2'>
                              Layer-2
                            </option>
                            <option value='layer-3' id='layer-3'>
                              Layer-3
                            </option>
                          </select>
                        </div>
                        <div className='color'>
                          <select
                            className='form-select mx-4'
                            aria-label='Default select example'
                          >
                            <option selected>Select Color</option>
                            <option value='color-1' id='color-1'>
                              Color-1
                            </option>
                            <option value='color-2' id='color-2'>
                              Color-2
                            </option>
                            <option value='color-3' id='color-3'>
                              Color-3
                            </option>
                          </select>
                        </div>
                        <br />
                      </div>

                      <div className='my-1'>
                        <input className='mx-2' type='submit' value='Continue' id='bslcContkBtn' onClick={() => navigate('/prodTable')} />

                        <button className='my-2' onClick={() => navigate(-1)}>Go Back Home</button>
                      </div>
                    </div>
                  </center>
                </div>
              </div>
              <footer>
                <div className='footer'>
                  Built{' '}
                  <span role='img' aria-label='love'>
                    💚
                  </span>{' '}
                  in Kanpur UP India
                </div>
              </footer>
            </div>
            {/* <button onClick={() => navigate(-1)}>Go Back Home</button> */}
          </header>
        </div>
      </div>
    </>
  )
}

export default OperationPanel
