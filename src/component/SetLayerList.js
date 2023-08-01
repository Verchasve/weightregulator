import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly
// Layer layer

function SetLayerList() {
  const navigate = useNavigate();
  const [layers, setLayers] = useState([]);
  const [newLayer, setNewLayer] = useState('');

  useEffect(() => {
    retrieveLayers();
  }, []);

  const retrieveLayers = () => {
    axios
      .get(`${Settings.serviceHost}:${Settings.servicePort}/getLayer`)
      .then(function (response) {
        const ls = response?.data;
        setLayers(ls || []);
        console.log(`List of Layers : ${JSON.stringify(ls)}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {

    setNewLayer(event.target.value);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(layers),
    };
    const apiUrlLayer = `${Settings.serviceHost}:${Settings.servicePort}/setLayer`;
    fetch(apiUrlLayer, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));


  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newLayer.trim() === '') {
      return;
    }
    const newLayerObj = { id: Date.now(), text: newLayer };
    setLayers([...layers, newLayerObj]);
    setNewLayer('');
    // Update the API with the new layer
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLayerObj),
    };
    const apiUrlLayer = `${Settings.serviceHost}:${Settings.servicePort}/setLayer`;
    fetch(apiUrlLayer, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleLayerDelete = (id) => {

    // Update the API with the updated layers list
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Send the ID of the layer to be deleted
    };
    const apiUrlLayer = `${Settings.serviceHost}:${Settings.servicePort}/deleteLayer`;
    fetch(apiUrlLayer, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(`Deleted Check : ${response}`);
      })
      .catch((err) => {
        console.error(err);
      });
    const updatedLayers = layers.filter((data) => data?._id !== id);
    console.log(`Update list : ${JSON.stringify(updatedLayers)}`);
    setLayers(updatedLayers);
    setNewLayer('');
  };

  // const handleSavelayer = () => {
  //   // Update the API with the entire layers list
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(layers),
  //   };
  //   const apiUrllayer = `${Settings.serviceHost}:${Settings.servicePort}/setlayer`;
  //   fetch(apiUrllayer, options)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  return (
    <div>
      <form className="container my-3" onSubmit={handleFormSubmit}>
        <label htmlFor="title" className="form-label mx-3">
          <strong> Set Layer </strong>
        </label>
        <input type="text" value={newLayer} onChange={handleInputChange} />
        <button className="mx-2" type="submit">
          Add
        </button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>

      <div className="container my-3">
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
            borderRadius: '5%',
          }}
        >
          {layers.map((data) => (
            <li key={data._id}>
              {data.text}
              <button
                className="btn btn-block btn-danger my-2 mx-2"
                onClick={() => handleLayerDelete(data._id)}
              >
                <span className="fa fa-trash"> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        {/* <button className="mx-2" onClick={handleSavelayer}>
          Save
        </button> */}
      </div>
    </div>
  );
}

export default SetLayerList;
