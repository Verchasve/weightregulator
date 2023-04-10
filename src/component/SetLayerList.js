import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'

const SetLayerList = () => {
    const navigate = useNavigate()
    const [layers, setLayer] = useState([]);
    const [newLayer, setNewLayer] = useState('');
  
    const handleInputChange = (event) => {
      setNewLayer(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (newLayer.trim() === '') {
        return;
      }
      setLayer([...layers, { id: Date.now(), text: newLayer }]);
      setNewLayer('');
    };
  
    const handlelayerDelete = (id) => {
      setLayer(layers.filter((layer) => layer.id !== id));
    };
  
    let layerStyle={
      border: "2px red"
    }
  return (
    <div>
      
      <form className='container my-3' onSubmit={handleFormSubmit}>
      <label htmlFor="title" className="form-label mx-3"><strong> Set Layers </strong></label>
        <input type="text" value={newLayer} onChange={handleInputChange} />
        <button className='mx-2'  type="submit">Add</button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>
      
      <div className='container' style={layerStyle}>
      <ul >
        {layers.map((layer) => (
          <li key={layer.id}>
            {layer.text}
            <button className='btn btn-sm btn-danger my-2 mx-2' onClick={() => handlelayerDelete(layer.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className='mx-2'>Save</button>
      </div>
    </div>
  )
}

export default SetLayerList
