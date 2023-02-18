import React from 'react';
import {useNavigate} from "react-router-dom"
import '../App.css';



const AdminPortal = () => {

const navigate = useNavigate();

return (
<>
	<div className="App">
    <header className="App-header">  
    <h1 style={{color:"green"}}>Welcome To Admin Portal</h1>
	<button onClick={()=>navigate(-1)}>Go Back Home</button>
	</header>
	</div>
</>
)
};

export default AdminPortal;
