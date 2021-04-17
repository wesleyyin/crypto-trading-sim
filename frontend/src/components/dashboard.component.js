import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Chart from 'kaktana-react-lightweight-charts'
import './dashboard.css';

import axios from 'axios'
//pass in viewed user, connection status, and id of user who is viewing
class Dashboard extends Component {
  bcws = new WebSocket ("wss://stream.binance.us:9443/ws/btcusdt@trade");
  constructor(props){
    super(props);
    
    this.updatePosts= this.updatePosts.bind(this);

    this.bcOnMessage = this.bcOnMessage.bind(this);
    this.state = {
      posts : [],
      bcLineSeries : [{
          data: [
              {time: 1618679636808, value: "60543.10000000"},
              {time: 1618679644972, value: "60496.10000000"},
              {time: 1618679644985, value: "60496.10000000"},
              {time: 1618679645153, value: "60496.10000000"}
          ]
      }],
      bcData: [],
      bcPrice: 0,
      bcKey: 0
      

    };
    
  }
  
  componentDidMount(){
    const user = localStorage.getItem("userID");
    alert(user);
    if (user.length ==0) {
        alert("you are not logged in");
        window.location.href = '/login';
    }this.bcws.onmessage = (e)=> this.bcOnMessage(e);
    this.updatePosts();
}
  
bcOnMessage(event){
    var response = JSON.parse(event.data)
    var utcMiliSec = response.E
    var temp = {time: utcMiliSec, value: response.p}
    var data = this.state.bcData;
    console.log(data);
    var lineSeries = this.state.bcLineSeries;
    console.log(lineSeries);
    data.push(temp);
    var pastKey = this.state.bcKey;
    lineSeries[0].data = data
    this.setState({
        bcData: data,
        bcPrice: Number(response.p),
        bcLineSeries: lineSeries,
        bcKey: pastKey+1
    })
    
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
    console.log("render");
    return (
      <div id = "postDisplay">
          <Chart lineSeries={this.state.bcLineSeries} key = {this.state.bcKey}autoWidth height={320} />
        
       
      </div>
    );
  }
}
 
export default Dashboard;