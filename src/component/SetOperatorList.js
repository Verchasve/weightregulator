import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Settings from '../settings'; // If Settings is a regular object, import it directly


// Operator operator

function SetOperatorList() {
  const navigate = useNavigate();
  const [operators, setOperators] = useState([]);
  const [newOperator, setNewOperator] = useState('');

  useEffect(() => {
    retrieveOperators();
  }, []);

  const retrieveOperators = () => {
    axios
      .get(`${Settings.serviceHost}:${Settings.servicePort}/getOperator`)
      .then(function (response) {
        const ls = response?.data;
        setOperators(ls || []);
        console.log(`List of Operators : ${JSON.stringify(ls)}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {

    setNewOperator(event.target.value);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operators),
    };
    const apiUrlOperator = `${Settings.serviceHost}:${Settings.servicePort}/setOperator`;
    fetch(apiUrlOperator, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));


  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newOperator.trim() === '') {
      return;
    }
    const newOperatorObj = { id: Date.now(), text: newOperator };
    setOperators([...operators, newOperatorObj]);
    setNewOperator('');
    // Update the API with the new operator
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOperatorObj),
    };
    const apiUrlOperator = `${Settings.serviceHost}:${Settings.servicePort}/setOperator`;
    fetch(apiUrlOperator, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleOperatorDelete = (id) => {

    // Update the API with the updated operators list
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Send the ID of the operator to be deleted
    };
    const apiUrlOperator = `${Settings.serviceHost}:${Settings.servicePort}/deleteOperator`;
    fetch(apiUrlOperator, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(`Deleted Check : ${response}`);
      })
      .catch((err) => {
        console.error(err);
      });
    const updatedOperators = operators.filter((data) => data?._id !== id);
    console.log(`Update list : ${JSON.stringify(updatedOperators)}`);
    setOperators(updatedOperators);
    setNewOperator('');
  };

  // const handleSaveoperator = () => {
  //   // Update the API with the entire operators list
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(operators),
  //   };
  //   const apiUrloperator = `${Settings.serviceHost}:${Settings.servicePort}/setoperator`;
  //   fetch(apiUrloperator, options)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  return (
    <div>
      <form className="container my-3" onSubmit={handleFormSubmit}>
        <label htmlFor="title" className="form-label mx-3">
          <strong> Set Operator </strong>
        </label>
        <input type="text" value={newOperator} onChange={handleInputChange} />
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
          {operators.map((data) => (
            <li key={data._id}>
              {data.text}
              <button
                className="btn btn-block btn-danger my-2 mx-2"
                onClick={() => handleOperatorDelete(data._id)}
              >
                <span className="fa fa-trash"> </span> Delete{' '}
              </button>
            </li>
          ))}
        </ul>
        {/* <button className="mx-2" onClick={handleSaveoperator}>
          Save
        </button> */}
      </div>
    </div>
  );
}

export default SetOperatorList;
