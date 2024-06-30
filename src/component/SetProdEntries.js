import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'


export default function SetProdEntries() {
  const navigate = useNavigate();

  return (
    <>
      <body>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              Set Production Entries
            </a>
          </div>
        </nav>

        <div className='mainDiv my-4 mx-4' style={{ backgroundColor: "beige" }}>
          <div>
            <fieldset className='row mb-3'>
              <legend className='col-form-label col-sm-2 pt-0'>
                Set Product Entries
              </legend>

              <div className='col-sm-10'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='SetProductEntries'
                    id='brandRadio'
                    value='brandValue'
                    onClick={() => navigate('/setBrandList')}
                  />
                  <label className='form-check-label' htmlFor='brandValue'>
                    Set Brand
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='SetProductEntries'
                    id='sizeRadio'
                    value='sizeValue'
                    onClick={() => navigate('/setSizeList')}
                  />
                  <label className='form-check-label' htmlFor='sizeValue'>
                    Set Size
                  </label>
                </div>

                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='SetProductEntries'
                    id='layerRadio'
                    value='layerValue'
                    onClick={() => navigate('/setLayerList')}
                  />
                  <label className='form-check-label' htmlFor='layerValue'>
                    Set Layer
                  </label>
                </div>

                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='SetProductEntries'
                    id='colorRadio'
                    value='colorValue'
                    onClick={() => navigate('/setColorList')}
                  />
                  <label className='form-check-label' htmlFor='colorValue'>
                    Set Color
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className='my-5'>
            <div id='setUbinDiv' className='setProdEntriesBox'>
              <div id='setUbinBox'>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Unique Batch ID Number
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setUBIN'
                      placeholder='Set Unique Batch Id Number'
                    />
                  </div>
                  <button
                    className='btn btn-secondary col-md-1 mx-2'
                    style={{ width: 'auto' }}
                    id='saveUbin'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div id='paramsSize'></div>
            </div>
            <fieldset className='row mb-3 my-4'>
              <legend className='col-form-label col-sm-2 pt-0'>
                Set Operator & Shift
              </legend>
              <div className='col-sm-10'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='SetProductEntries'
                    id='operatorsRadio'
                    value='operatorsValue'
                    onClick={() => navigate('/setOperatorList')}
                  />
                  <label className='form-check-label' htmlFor='operatorsValue'>
                    Set Operators Names
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='SetProductEntries'
                    id='shiftsRadio'
                    value='shiftsValue'
                  />
                  <label className='form-check-label' htmlFor='shiftsValue'>
                    Set Shifts
                  </label>
                </div>
              </div>
            </fieldset>


          </div>
          <hr />

          <div className='my-3'>
         
            <button className='btn btn-primary col-md-1' onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </body>
    </>
  )
}
