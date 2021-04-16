import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';

export default class Signup extends Component{
    constructor(props){
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
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
    onChangeConfirmPassword(e){
        this.setState({
            passwordConfirm : e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }
// enforce some login restrictions
    onSubmit(e){
        e.preventDefault();
        const username = this.state.username;
        const pass = this.state.password;
        if(!pass==this.state.passwordConfirm){
            alert("Passwords Don't Match");
            return;
        }
        const user = {
            username  : username,
            password : pass
        }
        console.log(user);

        axios.post("http://localhost:5000/users/register", user)
            .then(function(res){
                alert(res.data.status);
                if(res.data.status){
                    localStorage.setItem('userID', res.data.id);
                    localStorage.setItem('username', username);
                    alert("works");
                    //TODO: redirect to posts page here
                    window.location.href = "/search"
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
            <h3>Sign Up</h3>
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
                    <label>Confirm Password: </label>
                    <input type = "password" 
                        required
                        className = "form-control"
                        value = {this.state.onChangeConfirmPassword}
                        onChange = {this.onChangeConfirmPassword}
                        />    
                </div>
                    
                    
                    <div className = "form-group">
                        <input type = "submit" value = "Sign up" className = "btn btn-primary"/>
                    </div>

                </form>
            </div>

        )
    }
}