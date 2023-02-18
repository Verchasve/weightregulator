import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import '../App.css';

import List from './List';
import withListLoading from './withListLoading';

const Settings = require("../settings");
 
const OperationPanel = () => {

	const navigate = useNavigate();

	const ListLoading = withListLoading(List);
	const [appState, setAppState] = useState({
	  loading: false,
	  repos: null,
	});

	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `${Settings.serviceHost}:${Settings.servicePort}/getData`;
		fetch(apiUrl)
		.then((res) => res.json())
		.then((users) => {
			setAppState({ loading: false, users: users });
		});
	}, [setAppState]);

	return (
	<>
		<div className="App">
		<header className="App-header">  
		<h1 style={{color:"green"}}>Welcome To Operation Panel </h1>
		<div className='App'>
		<div className='container'>
			<h1>User DB Collection</h1>
		</div>
		<div className='repo-container'>
			<ListLoading isLoading={appState.loading} users={appState.users} />
		</div>
		<footer>
			<div className='footer'>
			Built{' '}
			<span role='img' aria-label='love'>
				💚
			</span>{' '} in Kanpur UP India
			</div>
		</footer>
		</div>
		<button onClick={()=>navigate(-1)}>Go Back Home</button>
		</header>
		</div>
	</>
	)

};

export default OperationPanel;
