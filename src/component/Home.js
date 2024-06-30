import React from 'react'
import logo from '../logo.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Settings = require('../settings')

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
    <div className='App' style={{ widows: 'fit-content', alignContent: 'center', height: 'fit-content'  }}>
     
      <div className='App' style={{ widows: 'initial' }}>
        <header className='App-header'>
        <h1 style={{ color: 'white' }}>MP&AD ENTERPRISES</h1>
          <h1 style={{ color: 'yellow' }}>Weighing Registrator</h1>
          <img src={logo} className='App-logo' alt='logo' />

          <div>
            <button className='my-2' onClick={() => navigate('/operation')}>
              Navigate to Operator Panel
            </button>
          </div>

          <div>
            <button onClick={() => navigate('/admin')}>
              Navigate to Admin Panel
            </button>
          </div>
        </header>
      </div>

      </div>
    </>
  )
}

export default Home
