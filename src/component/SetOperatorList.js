import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'

const SetOperatorList = () => {
    const navigate = useNavigate()
    const [operators, setOperator] = useState([]);
    const [newOperator, setNewOperator] = useState('');
  
    const handleInputChange = (event) => {
      setNewOperator(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (newOperator.trim() === '') {
        return;
      }
      setOperator([...operators, { id: Date.now(), text: newOperator }]);
      setNewOperator('');
    };
  
    const handleOperatorDelete = (id) => {
      setOperator(operators.filter((operator) => operator.id !== id));
    };

    const handleSaveOperator = () => {
      const reqBody = {
        "operators": operators,
  
      };
      console.log(`Body ${JSON.stringify(reqBody)}`)
      const options = {
        method: 'POST',
        operators: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody),
      };
      const apiUrl = `${Settings.serviceHost}:${Settings.servicePort}/setOperator`;
      fetch(apiUrl, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    };
  
    let operatorStyle={
      border: "2px red"
    }
  return (
    <div>
      
      <form className='container my-3' onSubmit={handleFormSubmit}>
      <label htmlFor="title" className="form-label mx-3"><strong> Set Operator names </strong></label>
        <input type="text" value={newOperator} onChange={handleInputChange} />
        <button className='mx-2'  type="submit">Add</button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>
      
      <div className='container' style={operatorStyle}>
      <ul >
        {operators.map((operator) => (
          <li key={operator.id}>
            {operator.text}
            <button className='btn btn-sm btn-danger my-2 mx-2' onClick={() => handleOperatorDelete(operator.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className='mx-2' onClick={handleSaveOperator} >Save</button>
      </div>
    </div>
  )
}

export default SetOperatorList