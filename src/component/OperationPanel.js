import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import './OperationPanel.css'
import List from './List'
import withListLoading from './withListLoading'

const Settings = require('../settings');
let operators = [];
let brands = [];
let sizes = [];
let colors = [];
let layers = [];




const apiUrlOperator = `${Settings.serviceHost}:${Settings.servicePort}/getOperator`;
fetch(apiUrlOperator)
  .then(response => response.json())
  .then(response => operators = response)
  .catch(err => console.error(err));


const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/getBrand`;
fetch(apiUrlBrand)
  .then(response => response.json())
  .then(response => brands = response)
  .catch(err => console.error(err));

const apiUrlSize = `${Settings.serviceHost}:${Settings.servicePort}/getSize`;
fetch(apiUrlSize)
  .then(response => response.json())
  .then(response => sizes = response)
  .catch(err => console.error(err));

const apiUrlColor = `${Settings.serviceHost}:${Settings.servicePort}/getColor`;
fetch(apiUrlColor)
  .then(response => response.json())
  .then(response => colors = response)
  .catch(err => console.error(err));

const apiUrlLayer = `${Settings.serviceHost}:${Settings.servicePort}/getLayer`;
fetch(apiUrlLayer)
  .then(response => response.json())
  .then(response => layers = response)
  .catch(err => console.error(err));



const OperationPanel = ({ onSubmit , props}) => {
  const navigate = useNavigate()
  const ListLoading = withListLoading(List)
  //let operator, brand;

  const [appState, setAppState] = useState({
    loading: false,
    repos: null
  });

  // Passing the Operator value to ProdTable

  const [operators, setOperators] = useState([]);
  const [selectedOperatorvalue, setSelectedOperatorValue] = useState("");
  const handleOperatorChange = (event) => {
    setSelectedOperatorValue(event.target.value);
  }
  
  // Passing The Brand value to prodTable
  
  const [brands, setBrands] = useState([]);
  const [selectedBrandValue, setSelectedBrandValue] = useState("");
  const handleBrandChange = (event) => {
    setSelectedBrandValue(event.target.value);
  };

  
  // Passing the Size value to prodTable
  
  
  const [sizes, setSizes] = useState([]);
  const [selectedSizeValue, setSelectedSizeValue] = useState("");
  const handleSizeChange = (event) => {
    setSelectedSizeValue(event.target.value);
  }
  
  
  // Passing the Color value to prodtable
  const [colors, setColors] = useState([]);
  const [selectedColorValue, setSelectedColorValue] = useState("");
  const handleColorChnage = (event) => {
    setSelectedColorValue(event.target.value);
  }
  

  // Passing the Layer value to prodtable

  const [layers, setLayers] = useState([]);
  const [slelectedLayerValue, setSelectedLayerValue] = useState("");
  const handleLayerChange = (event) => {
    setSelectedLayerValue(event.target.value);
  }

  // Passing the Color value to prodtable

 

  const handleBrandContinue = () => {
    navigate('/prodTable', { 
      state:  {
        selectedOperatorvalue,
        selectedBrandValue,
        selectedSizeValue,
        selectedColorValue,
        slelectedLayerValue 
      }})
  };

  



  console.log(appState)

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrlOperator = `${Settings.serviceHost}:${Settings.servicePort}/getOperator`
    fetch(apiUrlOperator)
      .then(res => res.json())
      .then(data => setOperators(data))
      .then(users => {
        setAppState({ loading: false, users: users })
      })
      .catch(error => console.error('Error fetching operators:', error));
  }, [setAppState])

  // useEffect(() => {
  //   setAppState({ loading: true })
  //   const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/getBrand`
  //   fetch(apiUrlBrand)
  //     .then(res => res.json())
  //     .then(users => {
  //       setAppState({ loading: false, users: users })
  //     })
  // }, [setAppState])

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/getBrand`
    fetch(apiUrlBrand)
      .then(res => res.json())
      .then(data => setBrands(data))
      .then(users => {
        setAppState({ loading: false, users: users })
      })
      .catch(error => console.error('Error fetching brands:', error));
  
  }, [setAppState]);

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrlSize = `${Settings.serviceHost}:${Settings.servicePort}/getSize`
    fetch(apiUrlSize)
      .then(res => res.json())
      .then(data => setSizes(data))
      .then(users => {
        setAppState({ loading: false, users: users })
      })
      .catch(error => console.error('Error fetching sizes:', error))
  }, [setAppState])

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrlColor = `${Settings.serviceHost}:${Settings.servicePort}/getColor`
    fetch(apiUrlColor)
      .then(res => res.json())
      .then(data => setColors(data))
      .then(users => {
        setAppState({ loading: false, users: users })
      })
      .catch(error => console.error('Error fetching colors:', error))
  }, [setAppState])

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrlLayer = `${Settings.serviceHost}:${Settings.servicePort}/getLayer`
    fetch(apiUrlLayer)
      .then(res => res.json())
      .then(data => setLayers(data))
      .then(users => {
        setAppState({ loading: false, users: users })
      })
  }, [setAppState])




  // change done
  // const handleSubmit = () => {
  //   onSubmit(operator?.text, brand?.text);
  // };

  // const handleChanges = (event) => {
  //   console.log("Brand " + event.target.value);
  //   props.history.push('/prodTable/' + event.target.value);
  //   setBrandValue(event.target.value);
  // };


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
              <div className='repo-container'>
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
                              value={selectedOperatorvalue}
                              onChange={handleOperatorChange}
                            >
                              <option
                                value='operator-present'
                                id='operatorPresent'
                              >
                                operator present
                              </option>
                              {
                                operators.map((operator, index) => (
                                  <option value={operator?.text} id={`operator-${operator?._id}`}>
                                    {operator?.text}
                                  </option>
                                ))
                              }
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
                            value={selectedBrandValue}
                            onChange={handleBrandChange}
                          >
                            <option defaultValue id='selectBrand'>
                              Select Brand
                            </option>
                            {
                              brands.map((brand, index) => (
                                <option value={brand?.text} id={`brand-${brand?._id}`}>
                                  {brand?.text}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                        <div className='size'>
                          <select
                            className='form-select mx-2'
                            aria-label='Default select example'
                            value={selectedSizeValue}
                            onChange={handleSizeChange}
                          >
                            <option defaultValue>Select Size</option>
                            {

                              sizes.map((size, index) => (

                                <option value={size?.text} id={`size-${size?._id}`}>
                                  {size?.text}
                                </option>
                              ))

                            }
                          </select>
                        </div>
                        <div className='layer'>
                          <select
                            className='form-select mx-3'
                            aria-label='Default select example'
                            value={slelectedLayerValue}
                            onChange={handleLayerChange}
                          >
                            <option defaultValue>Select Layer</option>
                            {

                              layers.map((layer, index) => (

                                <option value={layer?.text} id={`layer-${layer?._id}`}>
                                  {layer?.text}
                                </option>
                              ))

                            }
                          </select>
                        </div>
                        <div className='color'>
                          <select
                            className='form-select mx-4'
                            aria-label='Default select example'
                            value={selectedColorValue}
                            onChange={handleColorChnage}
                          >
                            <option defaultValue>Select Color</option>
                            {

                              colors.map((color, index) => (

                                <option value={color?.text} id={`color-${color?._id}`}>
                                  {color?.text}
                                </option>
                              ))

                            }
                          </select>
                        </div>
                        <br />
                      </div>

                      <div className='my-1'>
                        {/* <input className='mx-2' type='submit' value='Continue' id='bslcContkBtn' onClick= {() => navigate('/prodTable')} /> */}

                        <button className='my-2' onClick={() => navigate(-1)}>Go Back Home</button>
                        <button className='my-2' onClick={handleBrandContinue}>submit</button>
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
          </header>
        </div>
      </div>
    </>
  )
}

export default OperationPanel
