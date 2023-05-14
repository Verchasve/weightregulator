import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Settings = require('../settings')


const SetLayerList = () => {
    const navigate = useNavigate()
    //const [layers, setLayer] = useState([]);
    const [newLayer, setNewLayer] = useState('');

  // Layer Entry Storing start layer

  let initLayer
  if (localStorage.getItem('layers') === null) {
    initLayer = []
  } else {
    initLayer = JSON.parse(localStorage.getItem('layers'))
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

  const [layers, setLayers] = useState(initLayer)
  useEffect(() => {
    localStorage.setItem('layers', JSON.stringify(layers))
  }, [layers])

  // Layer Entry Storing end

  
    const handleInputChange = (event) => {
      setNewLayer(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (newLayer.trim() === '') {
        return;
      }
      setLayers([...layers, { id: Date.now(), text: newLayer }]);
      setNewLayer('');
    };
  
    const handlelayerDelete = (id) => {
      setLayers(layers.filter((layer) => layer.id !== id));
    };

    // 

    const handleSaveLayer = () => {  
      const reqBody = {
        "layers": layers,
        
      }; 
      console.log(`Body ${JSON.stringify(reqBody)}`) 
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(reqBody),  
      };
      const apiUrlLayer = `${Settings.serviceHost}:${Settings.servicePort}/setLayer`;  
      fetch(apiUrlLayer, options)  
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
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
      <button className='mx-2' onClick={handleSaveLayer} >Save</button>
      </div>
    </div>
  )
}

export default SetLayerList
