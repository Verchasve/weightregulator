import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function Correction () {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid title'>
            <a className='navbar-brand title' href='#'>
              <h1>WELCOME TO MP&AD ENTERPRISES</h1>
            </a>
          </div>
        </nav>
        {/* If the operator forget in clicking the reject button. Need to correct the rejected entry
      in the production table. Then by entering the Unique Batch Id number, the detailing of the 
      tank can be obtained and can make the correction*/}
        <div className='my-3 container'>
          Enter UBIN{' '}
          <input type='text' name='correction-ubin' id='correction-ubin' />
          <input
            type='submit'
            defaultValue='Submit'
            id='correction-btn-submit'
          />
        </div>
        <div
          className='my-5 container'
          style={{
            verticalAlign: 'auto',
            width: 'fit-content',
            alignSelf: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'beige'
          }}
        >
          <table className='table'>
            <tbody>
              <tr>
                <th scope='row'>Date/Time:</th>
                <td>
                  <input type='text' id='correction-date-time' />
                </td>
              </tr>
              <tr>
                <th scope='row'> Operator Nmae:</th>
                <td>
                  <input type='text' id='correction-operator-name' />
                </td>
              </tr>
              <tr>
                <th scope='row'>Tank Weight:</th>
                <td>
                  <input type='text' id='correction-tank-weight' />
                </td>
              </tr>
              <tr>
                <th scope='row'>Brand:</th>
                <td>
                  <input type='text' id='correction-brand' />
                </td>
              </tr>
              <tr>
                <th scope='row'>Size:</th>
                <td>
                  <input type='text' id='correction-size' />
                </td>
              </tr>
              <tr>
                <th scope='row'>Layer:</th>
                <td>
                  <input type='text' id='correction-layer' />
                </td>
              </tr>
              <tr>
                <th scope='row'>Color:</th>
                <td>
                  <input type='text' id='correction-color' />
                </td>
              </tr>
            </tbody>
          </table>
          <div className='my-3'>
            {/* <input type="submit" defaultValue="Back" id="correctionBackBtn" /> */}
            <button onClick={() => navigate(-1)}>Back </button>
          </div>
        </div>
      </div>
    </>
  )
}
