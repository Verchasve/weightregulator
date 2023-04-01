import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'


export default function SetProdEntries () {
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

        <div className='mainDiv my-4 mx-4'>
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
                  />
                  <label className='form-check-label' htmlFor='colorValue'>
                    Set Color
                  </label>
                </div>
              </div>
            </fieldset>
            <div id='brandDiv' className='setProdEntriesBox'>
              <div id='brandBox' style={{ display: 'none' }}>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Brand 1
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setBrand1'
                      placeholder='Set Brand 1'
                    />
                  </div>
                  <button
                    className='btn btn-primary col-md-1'
                    style={{ width: 'auto' }}
                    type='submit'
                    id='addBrand'
                  >
                    +
                  </button>
                  <button
                    className='btn btn-secondary col-md-2 mx-2'
                    style={{ width: 'auto' }}
                    type='submit'
                    onclick='AddBrandList()'
                    id='saveBrand'
                  >
                    Save
                  </button>
                </div>
                <div className='addedProdEntries' id='paramsBrand'></div>
              </div>
            </div>
            <div id='sizeDiv' className='setProdEntriesBox'>
              <div id='sizeBox' style={{ display: 'none' }}>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Size 1
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setSize1'
                      placeholder='Set Size Name 1'
                    />
                  </div>
                  <button
                    className='btn btn-primary col-md-1'
                    style={{ width: 'auto' }}
                    id='addSize'
                  >
                    +
                  </button>
                  <button
                    className='btn btn-secondary col-md-2 mx-2'
                    style={{ width: 'auto' }}
                    id='saveSize'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className='addedProdEntries' id='paramsSize'></div>
            </div>
            <div id='layerDiv' className='setProdEntriesBox'>
              <div id='layerBox' style={{ display: 'none' }}>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Layer 1
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setLayer1'
                      placeholder='Set Layer Number 1'
                    />
                  </div>
                  <button
                    className='btn btn-primary col-md-1'
                    style={{ width: 'auto' }}
                    id='addLayer'
                  >
                    +
                  </button>
                  <button
                    className='btn btn-secondary col-md-2 mx-2'
                    style={{ width: 'auto' }}
                    id='saveLayer'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className='addedProdEntries' id='paramsLayer'></div>
            </div>
            <div id='colorDiv' className='setProdEntriesBox'>
              <div id='colorBox' style={{ display: 'none' }}>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Color Type 1
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setColor1'
                      placeholder='Set Color type 1'
                    />
                  </div>
                  <button
                    className='btn btn-primary col-md-1'
                    style={{ width: 'auto' }}
                    id='addColor'
                  >
                    +
                  </button>
                  <button
                    className='btn btn-secondary col-md-2 mx-2'
                    style={{ width: 'auto' }}
                    id='saveColor'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className='addedProdEntries' id='paramsColor'></div>
            </div>
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

            <div id='operatorsDiv' className='setProdEntriesBox'>
              <div id='operatorsBox' style={{ display: 'none' }}>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Operators Name 1
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setOperators1'
                      placeholder='Set Operators1'
                    />
                  </div>
                  <button
                    className='btn btn-primary col-md-1'
                    style={{ width: 'auto' }}
                    id='addOperators'
                  >
                    +
                  </button>
                  <button
                    className='btn btn-secondary col-md-1 mx-2'
                    style={{ width: 'auto' }}
                    id='saveOperators'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div id='paramsOperators'></div>
            </div>

            <div id='shiftsDiv' className='setProdEntriesBox'>
              <div id='shiftsBox' style={{ display: 'none' }}>
                <div className='row'>
                  <label htmlFor='url' className='col-sm-2 col-form-label'>
                    Set Shifts
                  </label>
                  <div className='col-md-2'>
                    <input
                      type='text'
                      className='form-control'
                      id='setShifts'
                      placeholder='Set Shifts'
                    />
                  </div>
                  <button
                    className='btn btn-primary col-md-1'
                    style={{ width: 'auto' }}
                    id='addShifts'
                  >
                    +
                  </button>
                  <button
                    className='btn btn-secondary col-md-1 mx-2'
                    style={{ width: 'auto' }}
                    id='saveOperators'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div id='paramsShifts'></div>
            </div>
          </div>
          <hr />

          <div className='my-3'>
            {/* <input type='submit' value='Back' id='setProdEntriesBackBtn' /> */}
            <button onClick={() => navigate(-2)}>Back</button>
          </div>
        </div>
      </body>
    </>
  )
}
