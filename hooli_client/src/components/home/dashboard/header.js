import React from 'react';
import '../../../stylesheets/dashboard/header.css';


function MainHeader (props) {
    return (
        <>
            <div className="d-flex main-cont align-items-center p-4 justify-content-between">
                <div className="left-side-container d-flex align-items-center">
                    <i className="fa fa-list mr-5" onClick={props.toggleMenu}></i>
                    <figure>
                        <img src={"https://lh3.googleusercontent.com/proxy/Vmr7kq1xoGbntIxb3mWJY1O-FSEWRqqcNmizMTJifnE5QvYQwzVqYnAfQn8SCNJir4SWYsvpMAX0-t8rqZUTqp55hf9b3qEehLLmA7zHqgZYxg8aoEevwe_cfeVigSj-EF0tXuQO"} alt="hooli_logo" />
                    </figure>
                </div>
                <div className="right-side-container">
                    <button className="px-2 py-2 mr-5" onClick={() => {props.openComp(1)}}>
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