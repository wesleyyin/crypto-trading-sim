import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios'
//pass in viewed user, connection status, and id of user who is viewing
class Dashboard extends Component {
  constructor(props){
    super(props);
    
    this.updatePosts= this.updatePosts.bind(this);


    this.renderNext = this.renderNext.bind(this);

    this.nextPost = this.nextPost.bind(this);

   
    this.state = {
      posts : []
    };
  }
  componentDidMount(){
    const user = localStorage.getItem("username");
    alert(user);
    if (user.length ==0) {
        alert("you are not logged in");
        window.location.href = '/login';
    }
    this.updatePosts();
}
  


updatePosts(){
    const user = localStorage.getItem("userID");
  
  
   axios.post("http://localhost:5000/posts/byuser", {user: user})
       .then(function(res){
         console.log(res);
           this.setState({
               posts: res.data.posts
           });
           console.log(this.state.posts);
           
       }.bind(this)) 
       .catch(err => console.log('Error: ' + err));
}

  
  
  render() {
    const currPosts = this.state.posts;
    if(typeof currPosts == 'undefined'||!currPosts.length){
      return(<p>Your Feed is Empty</p>);
    }
    const post = currPosts[currPosts.length-1];
    if(post == null){
      this.nextPost();
    }
    const imageName = post.photoName;
    const caption = post.caption;
    return (
      <div id = "postDisplay">
        <div className = "imgDiv" style= {{height: '500px'}}>
          <img style={{height: '100%'}} src={process.env.PUBLIC_URL + '/images_uploads/' + imageName } />
        </div>
        <p>{caption}</p>
        <this.renderNext/>
      </div>
    );
  }
}

export default Dashboard;