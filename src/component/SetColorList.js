import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Settings = require('../settings')


const SetColorList = () => {
  const navigate = useNavigate()
  //const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState('');

  // Color Entry Storing start

  let initColor;
  if (localStorage.getItem("colors") === null) {
    initColor = [];
  }
  else {
    initColor = JSON.parse(localStorage.getItem("colors"));
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

 const [colors, setColors] = useState(initColor);
  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors])

  // Color Entry Storing end


  const handleInputChange = (event) => {
    setNewColor(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newColor.trim() === '') {
      return;
    }
    setColors([...colors, { id: Date.now(), text: newColor }]);
    setNewColor('');
  };

  const handlecolorDelete = (id) => {
    setColors(colors.filter((color) => color.id !== id));
    localStorage.setItem("colors", JSON.stringify(colors));
  };

  const handleSaveColor = () => {
    const reqBody = {
      "colors": colors,

    };
    console.log(`Body ${JSON.stringify(reqBody)}`)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody),
    };
    const apiUrlColor = `${Settings.serviceHost}:${Settings.servicePort}/setColor`;
    fetch(apiUrlColor, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };
  

  let colorStyle = {
    border: "2px red"
  }
  return (
    <div>

      <form className='container my-3' onSubmit={handleFormSubmit}>
        <label htmlFor="title" className="form-label mx-3"><strong> Set color </strong></label>
        <input type="text" value={newColor} onChange={handleInputChange} />
        <button className='mx-2' type="submit">Add</button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>

      <div className='container' style={colorStyle}>
        <ul >
          {colors.map((color) => (
            <li key={color.id}>
              {color.text}
              <button className='btn btn-sm btn-danger my-2 mx-2' onClick={() => handlecolorDelete(color.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button className='mx-2' onClick={handleSaveColor}>Save</button>
      </div>
    </div>
  )
}

export default SetColorList
