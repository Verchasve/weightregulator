import React from 'react';
import logo from '../logo.svg'; 
import '../App.css';
import {useNavigate} from "react-router-dom"

const Settings = require("../settings");


const Home = () => {

const navigate = useNavigate();
	
return (
	<>
     <div className="App">
        <header className="App-header">  
        <h1 style={{color:"yellow"}}>Welcome To Weight Controller</h1>
        <img src={logo} className="App-logo" alt="logo" />

        <div>
        <button onClick={()=>navigate("/admin")}>Navigate to Admin Panel</button>
        </div> 

		<div>
        <button onClick={()=>navigate("/operation")}>Navigate to Operator Panel</button>
        </div> 
        
        </header>
     </div>
	</>
)
};

export default Home;
