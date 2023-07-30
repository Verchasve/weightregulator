import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly

function SetBrandList() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState('');

  useEffect(() => {
    retrieveBrands();
  }, []);

  const retrieveBrands = () => {
    axios
      .get(`${Settings.serviceHost}:${Settings.servicePort}/getBrand`)
      .then(function (response) {
        const ls = response?.data;
        setBrands(ls || []);
        console.log(`List of Brands : ${JSON.stringify(ls)}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {

    setNewBrand(event.target.value);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brands),
    };
    const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/setBrand`;
    fetch(apiUrlBrand, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  

  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newBrand.trim() === '') {
      return;
    }
    const newBrandObj = { id: Date.now(), text: newBrand };
    setBrands([...brands, newBrandObj]);
    setNewBrand('');
    // Update the API with the new brand
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBrandObj),
    };
    const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/setBrand`;
    fetch(apiUrlBrand, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleBrandDelete = (id) => {
  
    // Update the API with the updated brands list
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Send the ID of the brand to be deleted
    };
    const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/deleteBrand`;
    fetch(apiUrlBrand, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(`Deleted Check : ${response}`);
      })
      .catch((err) => {
        console.error(err);
      });
    const updatedBrands = brands.filter((data) => data?._id !== id); 
    console.log(  `Update list : ${JSON.stringify(updatedBrands)}`); 
    setBrands(updatedBrands); 
    setNewBrand('');
  };

  // const handleSaveBrand = () => {
  //   // Update the API with the entire brands list
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(brands),
  //   };
  //   const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/setBrand`;
  //   fetch(apiUrlBrand, options)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  return (
    <div>
      <form className="container my-3" onSubmit={handleFormSubmit}>
        <label htmlFor="title" className="form-label mx-3">
          <strong> Set Brand </strong>
        </label>
        <input type="text" value={newBrand} onChange={handleInputChange} />
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
          {brands.map((data) => (
            <li key ={data._id}>
              {data.text} 
              <button
                className="btn btn-block btn-danger my-2 mx-2"
                onClick={() => handleBrandDelete(data._id)}
              >
                <span className="fa fa-trash"> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        {/* <button className="mx-2" onClick={handleSaveBrand}>
          Save
        </button> */}
      </div>
    </div>
  );
}

export default SetBrandList;
