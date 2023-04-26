import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Settings = require('../settings')

function SetBrandList () {
  const navigate = useNavigate()
  const [brands, setBrands] = useState([])
  const [newBrand, setNewBrand] = useState('')

  const handleInputChange = event => {
    setNewBrand(event.target.value)
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    if (newBrand.trim() === '') {
      return
    }
    setBrands([...brands, { id: Date.now(), text: newBrand }])
    setNewBrand('')
  }

  const handleBrandDelete = id => {
    setBrands(brands.filter(brand => brand.id !== id))
  }

  const handleSaveBrand = () => {  
    const reqBody = {
      "brands": brands,
      
    }; 
    console.log(`Body ${JSON.stringify(reqBody)}`) 
    const options = {
      method: 'POST',
      brands: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(reqBody),  
    };
    const apiUrl = `${Settings.serviceHost}:${Settings.servicePort}/setBrand`;  
    fetch(apiUrl, options)  
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
   };

  let brandStyle = {
    border: '2px red'
  }

  return (
    <div>
      <form className='container my-3' onSubmit={handleFormSubmit}>
        <label htmlFor='title' className='form-label mx-3'>
          <strong> Set Brand </strong>
        </label>
        <input type='text' value={newBrand} onChange={handleInputChange} />
        <button className='mx-2' type='submit'>
          Add
        </button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>

      <div className='container'>
        <ul
          style={{
            verticalAlign: 'auto',
            width: 'fit-content',
            alignSelf: 'center',
            alignItems: 'flex-end',
            backgroundColor: 'beige',
            borderColor: 'beige',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '5%'
          }}
        >
          {brands.map(brand => (
            <li key={brand.id}>
              {brand.text}
              <button
                className='btn btn-block btn-danger my-2 mx-2'
                onClick={() => handleBrandDelete(brand.id)}
              >
                <span className='fa fa-trash'> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        <button className='mx-2' onClick={handleSaveBrand}>Save</button>
      </div>
    </div>
  )
}

export default SetBrandList
