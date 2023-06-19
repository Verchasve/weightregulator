import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Settings = require('../settings')

function SetOperatorList () {
  const navigate = useNavigate()
  //const [brands, setBrands] = useState([initBrand])
  const [newOperator, setNewOperator] = useState('')

  // Brand Entry Storing start

  let initOperator
  if (localStorage.getItem('operators') === null) {
    initOperator = []
  } else {
    initOperator = JSON.parse(localStorage.getItem('operators'))
  }

  

  const [operators, setOperators] = useState(initOperator)
  useEffect(() => {
    localStorage.setItem('operators', JSON.stringify(operators))
  }, [operators])

  // Brand Entry Storing end

  const handleInputChange = event => {
    setNewOperator(event.target.value)
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    if (newOperator.trim() === '') {
      return
    }
    setOperators([...operators, { id: Date.now(), text: newOperator }])
    setNewOperator('')
  }

  const handleOperatorDelete = id => {
    setOperators(operators.filter(operator => operator.id !== id))
    localStorage.setItem('operators', JSON.stringify(operators))
  }

  const handleSaveOperator = () => {
    const reqBody = {
      operators: operators
    }
    console.log(`Body ${JSON.stringify(reqBody)}`)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(operators)
    }
    const apiUrlOperator = `${Settings.serviceHost}:${Settings.servicePort}/setOperator`
    fetch(apiUrlOperator, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }

  // let operatorStyle = {
  //   border: '2px red'
  // }

  return (
    <div>
      <form className='container my-3' onSubmit={handleFormSubmit}>
        <label htmlFor='title' className='form-label mx-3'>
          <strong> Set Operator </strong>
        </label>
        <input type='text' value={newOperator} onChange={handleInputChange} />
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
          {operators.map(operator => (
            <li key={operator.id}>
              {operator.text}
              <button
                className='btn btn-block btn-danger my-2 mx-2'
                onClick={() => handleOperatorDelete(operator.id)}
              >
                <span className='fa fa-trash'> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        <button className='mx-2' onClick={handleSaveOperator}>
          Save
        </button>
      </div>
    </div>
  )
}




export default SetOperatorList