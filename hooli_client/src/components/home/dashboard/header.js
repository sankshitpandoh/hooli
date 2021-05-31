import React from 'react';
import '../../../stylesheets/dashboard/header.css';
import Logo from '../../../hooliLogo.png';

function MainHeader (props) {
    return (
        <>
            <div className="d-flex main-cont align-items-center p-4 justify-content-between">
                <div className="left-side-container d-flex align-items-center">
                    <i className="fa fa-list mr-5" onClick={props.toggleMenu}></i>
                    <figure>
                        <img src={Logo} alt="hooli_logo" />
                    </figure>
                </div>
                <div className="right-side-container">
                    <button className="px-2 py-2 mr-5" onClick={() => {props.handlePathChange("/home/settings")}}>
                        Settings
                    </button>
                    <button className="px-2 py-2 ml-5">
                        Log out
                    </button>
                </div>
            </div>
        </>
    )
}

export default MainHeader;