import React from 'react'
import logo from '../logo.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const Settings = require('../settings')

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid title'>
          <a className='navbar-brand title' href='#'>
            <h1>MP&AD ENTERPRISES</h1>
          </a>
        </div>
      </nav>
      <div className='App' style={{widows:'initial'}}>
        <header className='App-header'>
          <h1 style={{ color: 'yellow' }}>Welcome To Weight Controller</h1>
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
    </>
  )
}

export default Home
