import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly

function SetColorList() {
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState('');

  useEffect(() => {
    retrieveColors();
  }, []);

  const retrieveColors = () => {
    axios
      .get(`${Settings.serviceHost}:${Settings.servicePort}/getColor`)
      .then(function (response) {
        const ls = response?.data;
        setColors(ls || []);
        console.log(`List of Colors : ${JSON.stringify(ls)}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {

    setNewColor(event.target.value);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colors),
    };
    const apiUrlColor = `${Settings.serviceHost}:${Settings.servicePort}/setColor`;
    fetch(apiUrlColor, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));


  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newColor.trim() === '') {
      return;
    }
    const newColorObj = { id: Date.now(), text: newColor };
    setColors([...colors, newColorObj]);
    setNewColor('');
    // Update the API with the new color
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newColorObj),
    };
    const apiUrlColor = `${Settings.serviceHost}:${Settings.servicePort}/setColor`;
    fetch(apiUrlColor, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleColorDelete = (id) => {

    // Update the API with the updated colors list
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Send the ID of the color to be deleted
    };
    const apiUrlColor = `${Settings.serviceHost}:${Settings.servicePort}/deleteColor`;
    fetch(apiUrlColor, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(`Deleted Check : ${response}`);
      })
      .catch((err) => {
        console.error(err);
      });
    const updatedColors = colors.filter((data) => data?._id !== id);
    console.log(`Update list : ${JSON.stringify(updatedColors)}`);
    setColors(updatedColors);
    setNewColor('');
  };

  // const handleSavecolor = () => {
  //   // Update the API with the entire colors list
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(colors),
  //   };
  //   const apiUrlcolor = `${Settings.serviceHost}:${Settings.servicePort}/setcolor`;
  //   fetch(apiUrlcolor, options)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  return (
    <div>
      <form className="container my-3" onSubmit={handleFormSubmit}>
        <label htmlFor="title" className="form-label mx-3">
          <strong> Set Color </strong>
        </label>
        <input type="text" value={newColor} onChange={handleInputChange} />
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
          {colors.map((data) => (
            <li key={data._id}>
              {data.text}
              <button
                className="btn btn-block btn-danger my-2 mx-2"
                onClick={() => handleColorDelete(data._id)}
              >
                <span className="fa fa-trash"> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        {/* <button className="mx-2" onClick={handleSavecolor}>
          Save
        </button> */}
      </div>
    </div>
  );
}

export default SetColorList;
