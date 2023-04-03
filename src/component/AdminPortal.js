import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const AdminPortal = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid title'>
          <a className='navbar-brand title' href='#'>
            <h1>WELCOME TO MP&AD ENTERPRISES</h1>
          </a>
        </div>
      </nav>
      <div className='App'>
        <header className='App-header'>
          <h1 style={{ color: 'yellow' }}>Welcome To Admin Portal</h1>
          <body>
            <div className='mx-4 my-4 passWord'>
              <label htmlFor='password'>
                Password:{' '}
                <input
                  type='password'
                  name='admin-password'
                  id='admin-password'
                />
                {/* <input type="submit"
                            value="Submit"
                            id="submitPassword" 
                            onClick={() => navigate("/adminServerPortal")}/> */}
                <button className='mx-2' onClick={() => navigate('/adminServerPortal')}>
                  Submit
                </button>
                <button onClick={() => navigate(-1)}>Go Back Home</button>
              </label>
            </div>
          </body>
        </header>
      </div>
    </>
  )
}

export default AdminPortal
