import React from 'react';
import { useNavigate } from "react-router-dom"
import '../App.css';
const About = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="App">
				<header className="App-header">
					<h1 style={{ color: "green" }}>Controller Class.</h1>
					<button onClick={() => navigate(-1)}>Go Back Home</button>
				</header>
			</div>
		</>
	)
};

export default About;
