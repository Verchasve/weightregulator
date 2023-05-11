import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Settings = require('../settings')


const SetOperatorList = () => {
    const navigate = useNavigate()
    //const [operators, setOperator] = useState([]);
    const [newOperator, setNewOperator] = useState('');

       // Operatorrator Entry Storing start layer

  let initOperator
  if (localStorage.getItem('layers') === null) {
    initOperator = []
  } else {
    initOperator = JSON.parse(localStorage.getItem('layers'))
  }

  // const onDelete = (todo) => {
  //   console.log("I am ondelete of todo", todo);
  //   // Deleting this way in react does not work
  //   // let index = todos.indexOf(todo);
  //   // todos.splice(index, 1);

  //   setTodos(todos.filter((e) => {
  //     return e !== todo;
  //   }));
  //   console.log("deleted", todos)
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }

  const [operators, setOperators] = useState(initOperator)
  useEffect(() => {
    localStorage.setItem('operators', JSON.stringify(operators))
  }, [operators])

  // Operator Entry Storing end
  
    const handleInputChange = (event) => {
      setNewOperator(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (newOperator.trim() === '') {
        return;
      }
      setOperators([...operators, { id: Date.now(), text: newOperator }]);
      setNewOperator('');
    };
  
    const handleOperatorDelete = (id) => {
      setOperators(operators.filter((operator) => operator.id !== id));
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