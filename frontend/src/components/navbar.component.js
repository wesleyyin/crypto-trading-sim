import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import UserProfile from './UserProfile';
export default class NavBar extends Component{

    render(){
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <div className = "collapse navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                    <li className = "navbar-item">
                    <Link to = "/" className = "nav-link">Feed</Link>
                    </li>
                    <li className = "navbar-item">
                    <Link to = "/search" className = "nav-link">Search</Link>
                    </li>
                    <li className = "navbar-item">
                    <Link to = "/new_post" className = "nav-link">New Post</Link>
                    </li>
                    <li className = "navbar-item">
                    <Link to = "/notifications" className = "nav-link">Connect Requests</Link>
                    </li>
                    <li className = "navbar-item">
                    <Link to = {"/profiles/" + localStorage.getItem("username")}  className = "nav-link">Your Profile</Link>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}