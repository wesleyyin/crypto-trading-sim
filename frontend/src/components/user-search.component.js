import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Redirect } from 'react-router-dom'
import SubProfile from './subprofile.component';
export default class UserSearch extends Component{
    
    constructor(props){
        super(props)
        this.onChangeSearch = this.onChangeSearch.bind(this);
      
        this.displayResults = this.displayResults.bind(this);
        this.onSubmit= this.onSubmit.bind(this);

        
        this.state = {
            searchedUser : '',
            displayedUser:{}
        };

    }

    componentDidMount(){
        const user = localStorage.getItem("username")
        alert(user);
        if (user.length ==0) {
            alert("you are not logged in");
          window.location.href = '/login';
        }
        const username = user;
        const userData = {
            username  : username,
        }
        console.log(userData);
        let id = "";
        
        axios.post("http://localhost:5000/users/findname", userData)
            .then(function(res){
                alert(res.data.status);
                if(res.data.status){
                    id = res.data.user._id
                    this.setState({
                        userID:id
                    });
                }else{
                    alert(res.data.msg);
                    alert("you are not logged in");
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
    }
    onChangeSearch(e){
        this.setState({
            searchedUser: e.target.value
        });
    }
    

    onSubmit(e){
        e.preventDefault();
        const username = this.state.searchedUser;
        const user = {
            username  : username,
        }
        console.log(user);
        //TODO: maybe display pfp in results
        axios.post('http://localhost:5000/users/findName', user)
            .then(res => {
                const status = res.data.status;
                if(status){
                    alert(res.data.user._id);
                    this.setState({
                        displayedUser:{
                            id: res.data.user._id,
                            username: username
                        }
                    });
                }else{
                    alert(res.data.msg);
                }
                
             });
             
    }
    displayResults() {
        if(this.state.displayedUser){
            return <SubProfile username = {this.state.displayedUser.username} userID = {this.state.displayedUser.id}/>;
        }
    }
    render(){
        return (
            <div>
            <h3>Search for a User</h3>
            <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                    <label>Username: @</label>
                    <input type = "text" 
                        required
                        className = "form-control"
                        value = {this.state.searchedUser}
                        onChange = {this.onChangeSearch}
                        />    
                </div>
                <div className = "form-group">
                    <input type = "submit" value = "Search!" className = "btn btn-primary"/>
                </div>
                </form>
                <div className="search-results">
                    <this.displayResults/>
                </div>
            </div>
        );
    }
}