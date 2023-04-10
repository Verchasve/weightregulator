import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'

const SetSizeList = () => {
    const navigate = useNavigate()
    const [sizes, setSize] = useState([]);
    const [newSize, setNewSize] = useState('');
  
    const handleInputChange = (event) => {
      setNewSize(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (newSize.trim() === '') {
        return;
      }
      setSize([...sizes, { id: Date.now(), text: newSize }]);
      setNewSize('');
    };
  
    const handleSizeDelete = (id) => {
      setSize(sizes.filter((size) => size.id !== id));
    };
  
    let sizeStyle={
      border: "2px red"
    }
  return (
    <div>
      
      <form className='container my-3' onSubmit={handleFormSubmit}>
      <label htmlFor="title" className="form-label mx-3"><strong> Set Size </strong></label>
        <input type="text" value={newSize} onChange={handleInputChange} />
        <button className='mx-2'  type="submit">Add</button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>
      
      <div className='container' style={sizeStyle}>
      <ul >
        {sizes.map((size) => (
          <li key={size.id}>
            {size.text}
            <button className='btn btn-sm btn-danger my-2 mx-2' onClick={() => handleSizeDelete(size.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className='mx-2'>Save</button>
      </div>
    </div>
  )
}

export default SetSizeList
