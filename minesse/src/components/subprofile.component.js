
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SubProfile extends Component {
  constructor(props){
    super(props);
    
  }
  
  //props:
  //need username for display
  //add profile pic link later
  //will pass in more later
  render() {
    
    return (
      <div className="subProfile" >
        <Link to = {"/profiles/" + this.props.username}>{this.props.username}</Link>
      </div>
    );
  }
}

export default SubProfile;