import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios'
//pass in viewed user, connection status, and id of user who is viewing
class ProfPosts extends Component {
  constructor(props){
    super(props);
    
    this.updatePosts= this.updatePosts.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.renderPrevious = this.renderPrevious.bind(this);
    this.renderNext = this.renderNext.bind(this);

    this.nextPost = this.nextPost.bind(this);
    this.previousPost = this.previousPost.bind(this);
    this.renderSelf = this.renderSelf.bind(this); //renders buttons users get if post is their own
    this.state = {
      posts : [],
      currPost : 0,
    };
  }
  componentDidMount(){
    this.updatePosts();
}
  nextPost(){
    if(this.state.currPost < this.state.posts.length){
        this.setState({
            currPost : this.state.currPost + 1
        })
    }

}
previousPost(){
    if(this.state.currPost > 0 ){
        this.setState({
            currPost : this.state.currPost - 1
        })
    }
}
deletePost(){
  const id = this.state.posts[this.state.currPost]._id;
  axios.delete("http://localhost:5000/posts/" + id)
  .then(function(res){
      alert(res.data);
      this.updatePosts();
  }.bind(this)) 
  .catch(err => console.log('Error: ' + err));
}
editPost(){
  const id = this.state.posts[this.state.currPost]._id;
  //TODO route to edit post page with id as param
}
updatePosts(){
  const byUser = this.props.viewedUser._id;
  const byuserData = {
      user: byUser
  }
   axios.post("http://localhost:5000/posts/byuser", byuserData)
       .then(function(res){
           this.setState({
               posts: res.data
           });
           console.log(this.state.posts);
           
       }.bind(this)) 
       .catch(err => console.log('Error: ' + err));
}
//give user edit/delete permissions on their own posts
renderSelf(){
  
  if(this.props.status =='self'){
    return(
      <div>
        <button onClick = {this.editPost}>Edit</button>
        <button onClick = {this.deletePost}>Delete</button>
      </div>
    )
  }return(<div></div>);
}
  renderPrevious(){
    if(this.state.currPost>0){
      return(<button onClick = {this.previousPost}>Previous</button>);
    }return (<div></div>)
  }
  renderNext(){
    if(this.state.currPost<this.state.posts.length-1){
      return(<button onClick = {this.nextPost}>Next</button>);
    }return (<div></div>)
  }
  render() {
    const currPosts = this.state.posts;
    if(!currPosts.length){
      return(<p>{this.props.viewedUser.username} has no posts</p>);
    }
            
    let posI = this.state.currPost
    while(posI>= currPosts.length){
      posI--;
    }
    const post = currPosts[posI];
    const imageName = post.photoName;
    const caption = post.caption;
    return (
      <div id = "postDisplay">
        <div className = "imgDiv" style= {{height: '500px'}}>
          <img style={{height: '100%'}} src={process.env.PUBLIC_URL + '/images_uploads/' + imageName } />
        </div>
        
        <p>{caption}</p>
        <this.renderPrevious/>
        <this.renderNext/>
        <this.renderSelf/>
      </div>
    );
  }
}

export default ProfPosts;