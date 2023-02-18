import React from 'react';
import logo from '../logo.svg'; 
import '../App.css';
import {useNavigate} from "react-router-dom"

const Home = () => {
const navigate = useNavigate();
	
return (
	<>
     <div className="App">
        <header className="App-header">  
        <h1 style={{color:"green"}}>Welcome To Admin Portal</h1>
        <img src={logo} className="App-logo" alt="logo" />

        <div>
        <button onClick={()=>navigate("/about")}>Tab1</button>
        </div> 

		<div>
        <button onClick={()=>navigate("/about")}>Tab2</button>
        </div> 
        
        </header>
     </div>
	</>
)
};

export default Home;
