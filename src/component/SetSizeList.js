import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly


// Size size

function SetSizeList() {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState('');

  useEffect(() => {
    retrieveSizes();
  }, []);

  const retrieveSizes = () => {
    axios
      .get(`${Settings.serviceHost}:${Settings.servicePort}/getSize`)
      .then(function (response) {
        const ls = response?.data;
        setSizes(ls || []);
        console.log(`List of Sizes : ${JSON.stringify(ls)}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {

    setNewSize(event.target.value);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sizes),
    };
    const apiUrlSize = `${Settings.serviceHost}:${Settings.servicePort}/setSize`;
    fetch(apiUrlSize, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => {
        console.error(err); 
      });
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newSize.trim() === '') {
      return;
    }
    const newSizeObj = { id: Date.now(), text: newSize };
    setSizes([...sizes, newSizeObj]);
    setNewSize('');
    // Update the API with the new size
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSizeObj),
    };
    const apiUrlSize = `${Settings.serviceHost}:${Settings.servicePort}/setSize`;
    fetch(apiUrlSize, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleSizeDelete = (id) => {

    // Update the API with the updated sizes list
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Send the ID of the size to be deleted
    };
    const apiUrlSize = `${Settings.serviceHost}:${Settings.servicePort}/deleteSize`;
    fetch(apiUrlSize, options)
      .then((response) => response.json())
      .then((response) => {
        const updatedSizes = response?  sizes.filter((data) => data?.id !== id) : sizes;
        console.log(`Update list : ${JSON.stringify(updatedSizes)}`);
        setSizes(updatedSizes);
        setNewSize('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form className="container my-3" onSubmit={handleFormSubmit}>
        <label htmlFor="title" className="form-label mx-3">
          <strong> Set Size </strong>
        </label>
        <input type="text" value={newSize} onChange={handleInputChange} />
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
          {sizes.map((data) => (
            <li key={data.id}>
              {data.text}
              <button
                className="btn btn-block btn-danger my-2 mx-2"
                onClick={() => handleSizeDelete(data.id)}
              >
                <span className="fa fa-trash"> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        {/* <button className="mx-2" onClick={handleSavesize}>
          Save
        </button> */}
      </div>
    </div>
  );
}

export default SetSizeList;
