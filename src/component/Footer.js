import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Footer() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid title">
                        <a className="navbar-brand title"
                            href="#">
                            <h1>WELCOME TO MP&AD ENTERPRISES</h1>
                        </a>
                    </div>
                </nav>
                <div className="my-4 mx-4">
                    <div className="my-4 mx-4">
                        Set Remarks <input type="text"
                            name="footer-remarks"
                            id="footer-remarks"
                            placeholder="Set Remarks" />
                    </div>

                    <div>
                        <input className="mx-2"
                            type="submit"
                            value="Save"
                            id="footerSaveBtn" />
                        <input type="submit"
                            value="Back"
                            id="footerBackBtn"
                            onClick={() => navigate(-1)} />
                    </div>
                </div>
            </div>
        </>
    )
}
