import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'


function SetBrandList() {
  const navigate = useNavigate()
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState('');

  const handleInputChange = (event) => {
    setNewBrand(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newBrand.trim() === '') {
      return;
    }
    setBrands([...brands, { id: Date.now(), text: newBrand }]);
    setNewBrand('');
  };

  const handleBrandDelete = (id) => {
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  let brandStyle={
    border: "2px red"
  }

  return (
    <div>
      
      <form className='container my-3' onSubmit={handleFormSubmit}>
      <label htmlFor="title" className="form-label mx-3"><strong> Set Brand </strong></label>
        <input type="text" value={newBrand} onChange={handleInputChange} />
        <button className='mx-2'  type="submit">Add</button>
        <button onClick={() => navigate(-1)}> Back </button>
      </form>
      
      <div className='container' style={brandStyle}>
      <ul >
        {brands.map((brand) => (
          <li key={brand.id}>
            {brand.text}
            <button className='btn btn-sm btn-danger my-2 mx-2' onClick={() => handleBrandDelete(brand.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className='mx-2'>Save</button>
      </div>
    </div>

  );
}

export default SetBrandList;


