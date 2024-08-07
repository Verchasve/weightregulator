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
    {/* <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid title'>
            <a className='navbar-brand title' href='#'>
              <h3>WELCOME TO MP&AD ENTERPRISES</h3>
            </a>
          </div>
        </nav> */}
      <div className='App' style={{ widows: 'initial' }}>
        <header className='App-header'>
        <h1 style={{ color: 'white' }}>MP&AD ENTERPRISES</h1>
          <h1 style={{ color: 'yellow' }}>Weighing Registrator</h1>
          <img src={logo} className='App-logo' alt='logo' />

          <div>
            <button className='btn btn-lg btn-light my-2' onClick={() => navigate('/operation')}>
              Operator Panel
            </button>
          </div>

          <div>
            <button className='btn btn-lg btn-light' onClick={() => navigate('/admin')}>
            Admin Panel
            </button>
          </div>
        </header>
      </div>

      </div>
    </>
  )
}

export default Home
