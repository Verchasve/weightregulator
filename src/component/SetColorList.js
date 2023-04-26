import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'

const SetColorList = () => {
  const navigate = useNavigate()
  const [colors, setColor] = useState([]);
  const [newColor, setNewColor] = useState('');

  const handleInputChange = (event) => {
    setNewColor(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newColor.trim() === '') {
      return;
    }
    setColor([...colors, { id: Date.now(), text: newColor }]);
    setNewColor('');
  };

  const handlecolorDelete = (id) => {
    setColor(colors.filter((color) => color.id !== id));
  };

  const handleSaveColor = () => {
    const reqBody = {
      "colors": colors,

    };
    console.log(`Body ${JSON.stringify(reqBody)}`)
    const options = {
      method: 'POST',
      colors: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody),
    };
    const apiUrl = `${Settings.serviceHost}:${Settings.servicePort}/setColor`;
    fetch(apiUrl, options)
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
