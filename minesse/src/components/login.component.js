import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import {Link} from 'react-router-dom';
export default class Login extends Component{
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        
        this.onSubmit= this.onSubmit.bind(this);



        this.state = {
            username : '',
            
        };

    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const username = this.state.username;
        const pass = this.state.password;
        const user = {
            username  : username,
            password : pass
        }
        console.log(user);

        axios.post("http://localhost:5000/users/login", user)
            .then(function(res){
                alert(res.data.status);
                if(res.data.status){
                    localStorage.setItem('username', username);
                    localStorage.setItem('userID', res.data.id);
                    alert("works");
                    window.location.href = "/search"
                    //TODO: redirect to posts page here
                }else{
                    alert(res.data.msg);
                }
            })
            .catch(err => console.log('Error: ' + err));
        //if valid: UserProfile.setName(user); and check name from session class
    }

    render(){
        return (
            <div>
            <h3>Log Into Your Account</h3>
            <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                    <label>Username: </label>
                    <input type = "text" 
                        required
                        className = "form-control"
                        value = {this.state.username}
                        onChange = {this.onChangeUsername}
                        />    
                </div>
                <div className = "form-group">
                    <label>Password: </label>
                    <input type = "password" 
                        required
                        className = "form-control"
                        value = {this.state.onChangePassword}
                        onChange = {this.onChangePassword}
                        />    
                </div>
                    
                    
                    <div className = "form-group">
                        <input type = "submit" value = "Login" className = "btn btn-primary"/>
                    </div>
                    <p>Don't have an account? <Link to = "/signup" >Sign up</Link></p>

                </form>
            </div>

        )
    }
}