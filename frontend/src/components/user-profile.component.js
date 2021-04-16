import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ProfPosts from './post-display-prof.component';
export default class UserProfile extends Component{
    constructor(props){
        super(props)

        
        this.updateConnection = this.updateConnection.bind(this);
        this.renderHead = this.renderHead.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderConnectStatus = this.renderConnectStatus.bind(this);

        this.reqConnect = this.reqConnect.bind(this);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);

        

        this.editProfile = this.editProfile.bind(this);

        

        this.state = {
            userID : '',
            viewedUser: '',
            posts :[],
            connectionStatus : 'none',
            currPost : 0,
            connectionID : '',
            
            
        };

    }
    
    componentDidMount(){
        const user = localStorage.getItem("username");
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
        
        
        axios.post("http://localhost:5000/users/findname", userData)
            .then(function(res){
                
                if(res.data.status){
                    let id = res.data.user._id
                    this.setState({
                        userID:id
                    });
                    const viewedUser = this.props.match.params.username;
                    const viewedUserData = {
                        username: viewedUser
                    };
                    axios.post("http://localhost:5000/users/findname", viewedUserData)
                        .then(function(ret){
                            if(ret.data.status){
                                this.setState({
                                    viewedUser: ret.data.user
                                });this.updateConnection();
                               

                            }else{
                                alert('user not found');
                                window.location.href = '/search';
                            }
                        }.bind(this)) 
                        .catch(err => console.log('Error: ' + err));
                }else{
                    alert(res.data.msg);
                    window.location.href = '/login';
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
    }
    
    
    updateConnection(){
        const userA = String(this.state.userID);
        const userB = String(this.state.viewedUser._id);
        console.log(userA);
        console.log(userB);
        const connectData = {
            userA : userA,
            userB: userB
        };
        axios.post("http://localhost:5000/connections/byusers", connectData)
            .then(function(res){
                const status = res.data.status;
                alert(status);
                if(this.state.connectionStatus!=status){
                    this.setState({
                        connectionStatus: status
                    });
                    if(status!="not connected"){
                        this.setState({
                            connectionID : res.data.id
                        });
                    }
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
    }
    
    
    renderHead(){
        const nameDisplay = this.props.match.params.username;
        const bio = this.state.viewedUser.bio;
        const pfp = this.state.viewedUser.profilePic;
        return (<div>
            <img src={pfp} alt ="Profile Pic" id = "pfp"/>
            <h1 id = "profName">{nameDisplay}</h1>
            <p id = "bio">{bio}</p>
        </div>);
    }
    editProfile(){

        window.location.href = "/edit-profile";

    }
    renderConnectStatus(){
        const status = this.state.connectionStatus;
        if(status=='connected'){
            return (<button onClick = {this.disconnect}>Disconnect</button>);
        }else if(status =='self'){
            //display edit head button
            return (<button onClick = {this.editProfile}>Edit</button>);
        }else if(status =='requested'){
            return(<p>Requested</p>)
        }else if(status =='pending'){
            return (
            <div>
                <p>{this.props.match.params.username} wants to connect with you</p>
                <button onClick = {this.connect}>Accept</button>
                <button onClick = {this.disconnect}>Decline</button>
            </div>
            
                )
            //display accept/decline buttons
        }else{
            //display connect button
            return (<button onClick = {this.reqConnect}>Connect</button>);
        }
    }
    disconnect(){
        
        axios.delete("http://localhost:5000/connections/" + this.state.connectionID)
        .then(function(res){
            alert(res.data);
            this.updateConnection();
        }.bind(this))
        .catch(err => console.log('Error: ' + err));
    }
    connect(){
        axios.post("http://localhost:5000/connections/accept/" + this.state.connectionID)
        .then(function(res){
            alert(res.data);
            this.updateConnection();
        }.bind(this))
        .catch(err => console.log('Error: ' + err));
    }
    reqConnect(){
        const userA = this.state.userID;
        const userB = this.state.viewedUser._id;
        const connectData = {
            userA: userA,
            userB: userB,
        };
        axios.post("http://localhost:5000/connections/add", connectData)
            .then(function(res){
                alert(res.data);
                this.updateConnection();
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
    }
    renderContent(){
        const status = this.state.connectionStatus;

        if(status=='connected' || status =='self'){
            //display posts in feed format
            return(<ProfPosts status = {status} user = {this.state.userID} viewedUser = {this.state.viewedUser}/>)
            
        }
        else{
            //do not display posts
            return(<p>Connect with {this.props.match.params.username} to view their posts</p>);
        }
    }

    render(){
        return (
        <div>
            <this.renderHead/>
            <this.renderConnectStatus/>
            <this.renderContent/>
        </div>

        )
    }
}