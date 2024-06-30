import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'


export default function Setting() {
  const navigate = useNavigate();
  return (
    <>
      <body>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid title'>
            <Link className='navbar-brand title' to='/'>
              <h1>setting Section To Set Entries And Other Parameters</h1>
            </Link>
          </div>
        </nav>
        <div className='my-4 mx-4 setting'>
          <div className='my-4'>
            <input
              type='submit'
              value='Set Header'
              name='hfpEntries'
            
              id='headerBtn'
              onClick={() => navigate("/header")}
            />
          
          </div>
          <div className='my-4'>
            <input
              type='submit'
              value='Set Footer'
              name='hfpEntries'
             
              id='footerBtn'
              onClick={() => navigate("/footer")}
            />
          </div>
          <div className='my-4'>
          
            <button onClick={() => navigate("/setProdEntries")}>Set Production Entries</button>
          </div>
          <div className='my-4'>
         
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </body>
    </>
  )
}
