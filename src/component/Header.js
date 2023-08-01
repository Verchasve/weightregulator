import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const Settings = require('../settings')

export default function Header() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    const handleSave = () => {
        const reqBody = {
            "companyName": companyName,
            "phone": companyPhone,
            "address": companyAddress
        };
        console.log(`Body ${JSON.stringify(reqBody)}`)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody),
        };
        const apiUrl = `${Settings.serviceHost}:${Settings.servicePort}/setHeader`;
        fetch(apiUrl, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    };

    return (
        <>
            <div>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <div className='container-fluid title'>
                        <a className='navbar-brand title' href='#'>
                            <h1>WELCOME TO MP&AD ENTERPRISES</h1>
                        </a>
                    </div>
                </nav>
                <div className='mx-4 my-4'>
                    <div className='mx-2 my-2'>
                        Set Company Name{' '}
                        <input
                            type='text'
                            name='SetCompanyName'
                            id='SetCompanyName'
                            placeholder='Company Name'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className='mx-2 my-2'>
                        Set Phone{' '}
                        <input
                            type='text'
                            name='SetCompanyName'
                            id='SetCompanyPhone'
                            placeholder='Phone Number'
                            value={companyPhone}
                            onChange={(e) => setCompanyPhone(e.target.value)}
                        />
                    </div>
                    <div className='mx-2 my-2'>
                        Set Company Address{' '}
                        <input
                            type='text'
                            name='SetCompanyAddress'
                            id='SetCompanyAddress'
                            placeholder='Company Address'
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type='submit' value='Save' id='headerSaveBtn' className='mx-2' onClick={handleSave} />
                        <button onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}