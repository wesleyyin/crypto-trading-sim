import React, { Component } from 'react';

//pass in user who is viewing and current post in 'user' and 'post'
class Comments extends Component {
  constructor(props){
    super(props);

    this.updateComments = this.updateComments.bind(this);
    this.addComment = this.addComment.bind(this);

    this.state = {
        comments :[],
        currComment: 0,
        commentIn : '',
    };

  }
  
  componentDidMount(){
    updateComments();
}
addComment(){
    const post = this.props.post;
    const content = this.state.commentIn;
    const user = this.props.user;
    if(post.length){
        const postId = post._id;
        const commentsData = {
            content: content,
            user: user,
            id: postId
        }
        axios.post("http://localhost:5000/comments/add", commentsData)
        .then(function(res){
            const response = res.data;
            alert(response);
            updateComments();
        }.bind(this)) 
        .catch(err => console.log('Error: ' + err));
    }
}
onChangeCommentIn(e){
    this.setState({
        commentIn: e.target.value
    });
}
 updateComments(){
    const post = this.props.post;
    if(post.length){
        const postId = post._id;
        const commentsData = {
            id: postId
        }
        axios.post("http://localhost:5000/comments/bypost", commentsData)
        .then(function(res){
            const comments = res.data;
            this.setState({
                comments : comments,
                currComment: 0
            })
        }.bind(this)) 
        .catch(err => console.log('Error: ' + err));
    }
}
displayComment(){

}
nextComment(){

}
previousComment(){

}
renderCommentButtons(){
    const len = this.state.comments.length;
    const i = this.state.currComment;
    if(i==0){
        return (<div>
                    <button onClick = {this.nextComment}>Next</button>
                </div>);
    }else if(i==len-1){
        return (<div>
            <button onClick = {this.previousComment}>Previous</button>
            </div>);
    }else{
        return (
            <div>
                <button onClick = {this.previousComment}>Previous</button>
                <button onClick = {this.nextComment}>Next</button>
            </div>
        );
    }
}
renderComment(){
    if(this.state.comments.length){
        const comment = this.state.comments[this.state.currComment];
        const content = comment.
        return()
    }
}
  //props:
  //need username for display
  //add profile pic link later
  //will pass in more later
  render() {
    return (
      <div className="commentDiv" >
        <div className = "form-group">
            <label>Add a Comment: </label>
            <input type = "text" 
                    className = "form-control"
                value = {this.state.commentIn}
                onChange = {this.onChangeCommentIn}
            />    
        </div>
        <button onClick = {this.addComment}>Add</button>

        <this.renderComment/>
        

      </div>
    );
  }
}

export default Comments;