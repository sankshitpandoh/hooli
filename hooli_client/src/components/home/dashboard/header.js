import React from 'react';
import '../../../stylesheets/dashboard/header.css';


function MainHeader (props) {
    return (
        <>
            <div className="d-flex main-cont align-items-center p-4 justify-content-between">
                <div className="left-side-container d-flex align-items-center">
                    <i className="fa fa-list mr-5" onClick={props.toggleMenu}></i>
                    <figure>
                        <img src={"https://lh3.googleusercontent.com/proxy/KuhwouLYBGbH7wSkquaEy6nUHLrOWLRTZ8MiZQ_SdzHUoDtHWU5MTbgLcV4uj5zKrzjFxfcteocku3bEBs3VqCH_AF5iZyd3NxcaE6aPntABkPNUrdHQ_ZbGPZjo64TwrPmkTM5_"} alt="hooli_logo" />
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