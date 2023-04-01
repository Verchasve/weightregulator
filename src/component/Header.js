import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Header () {
    const navigate = useNavigate();
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
        <div className='mx-4 my-4'>
          <div className='mx-2 my-2'>
            Set Company Name{' '}
            <input
              type='text'
              name='SetCompanyName'
              id='SetCompanyName'
              placeholder='Company Name'
            />
          </div>
          <div className='mx-2 my-2'>
            Set Phone{' '}
            <input
              type='text'
              name='SetCompanyName'
              id='SetCompanyPhone'
              placeholder='Phone Number'
            />
          </div>
          <div className='mx-2 my-2'>
            Set Company Address{' '}
            <input
              type='text'
              name='SetCompanyAddress'
              id='SetCompanyAddress'
              placeholder='Company Address'
            />
          </div>
          <div>
            <input type='submit' value='Save' id='headerSaveBtn' />
            {/* <input type='submit' value='Back' id='headerBackBtn' /> */}
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </>
  )
}
