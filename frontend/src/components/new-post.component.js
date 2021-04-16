import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Redirect } from 'react-router-dom'

export default class NewPost extends Component{
    
    constructor(props){
        super(props)
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
   
        this.onSubmit= this.onSubmit.bind(this);

        
        this.state = {
            userID : '',
            caption : ''
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
        
        
        axios.post("http://localhost:5000/users/findname", userData)
            .then(function(res){
                alert(res.data.status);
                if(res.data.status){
                    const id = res.data.user._id
                    this.setState({
                        userID:id
                    });
                }else{
                    alert(res.data.msg);
                }
            }.bind(this))
            .catch(err => console.log('Error: ' + err));
    }
    onChangeCaption(e){
        this.setState({
            caption: e.target.value
        });
    }
    onChangePhoto(e){
        this.setState({
            photo: e.target.files[0]
        });
    }

    onSubmit(e){
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('photo', this.state.photo);
        
        axios.post('http://localhost:5000/images/add/', formData)
            .then(res => {
                if(res.data.uploaded){
                    console.log("image uploaded");
                    const fileName = res.data.fileName;
                    const caption = this.state.caption;
                    const user = this.state.userID;
                    console.log(user);
                    const post = {
                        user: user,
                        caption: caption,
                        photoName: fileName
                    }
                    axios.post("http://localhost:5000/posts/add", post)
                        .then(function(res){
                            alert(res.data);
                        })
                        .catch(err => console.log('Error: ' + err));
                 }else{
                     alert("photo upload failed");
                 }
                
             });
             
    }
    
    render(){
        return (
            

            <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                
                <div className = "form-group">
                    <label>Image Upload: </label>
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={this.onChangePhoto}
                    />   
                </div>

                <div className = "form-group">
                    <label>Caption: </label>
                    <input type = "text" 
                        required
                        className = "form-control"
                        value = {this.state.caption}
                        onChange = {this.onChangeCaption}
                        />    
                </div>
    
               
    
    
                <div className = "form-group">
                    <input type = "submit" value = "Post!" className = "btn btn-primary"/>
                </div>
            </form>
        );
    }
}