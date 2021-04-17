import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Chart from 'kaktana-react-lightweight-charts'
import './dashboard.css';
import TransactionStub from './transaction-stub.component'

import axios from 'axios'
//pass in viewed user, connection status, and id of user who is viewing
//btc
//doge
//eth

class Dashboard extends Component {
  bcws = new WebSocket ("wss://stream.binance.us:9443/ws/btcusdt@trade");
  ethws = new WebSocket ("wss://stream.binance.us:9443/ws/ethusdt@trade");
  dogews = new WebSocket ("wss://stream.binance.us:9443/ws/dogeusdt@trade");
  constructor(props){
    super(props);
    
    this.updatePosts= this.updatePosts.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.bcOnMessage = this.bcOnMessage.bind(this);
    this.ethOnMessage = this.ethOnMessage.bind(this);
    this.dogeOnMessage = this.dogeOnMessage.bind(this);
    this.renderNW = this.renderNW.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleCryptoNameChange = this.handleCryptoNameChange.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.submit = this.submit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderPieChart = this.renderPieChart.bind(this);
    this.state = {
      posts : [],
      bcLineSeries : [{
          data: [
              
          ]
      }],
      bcData: [],
      bcPrice: 0,
      bcKey: 0,
      
      ethData: [],
      ethPrice: 0,
      ethKey: 0.5,
      ethLineSeries : [{
        data: [
            
        ]
      }],
      
      dogeLineSeries : [{
        data: [
            
        ]
      }],
      dogeData: [],
      dogePrice: 0,
      dogeKey: 0.2,
      type: "BUY",
      cryptoName: "Bitcoin",
      quantity: 0
      

    };
    
  }
  
  componentDidMount(){
    const user = localStorage.getItem("userID");
    alert(user);
    if (user.length ==0) {
        alert("you are not logged in");
        window.location.href = '/login';
    }this.bcws.onmessage = (e)=> this.bcOnMessage(e);
    this.dogews.onmessage = (e)=> this.dogeOnMessage(e);
    this.ethws.onmessage = (e)=> this.ethOnMessage(e);
    this.updatePosts();
}
  
bcOnMessage(event){
    var response = JSON.parse(event.data)
    var utcMiliSec = response.E
    var d = new Date(0)
    d.setUTCMilliseconds(utcMiliSec)
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
ethOnMessage(event){
  var response = JSON.parse(event.data)
  var utcMiliSec = response.E
  var d = new Date(0)
  d.setUTCMilliseconds(utcMiliSec)
  var temp = {time: utcMiliSec, value: response.p}
  var data = this.state.ethData;
  console.log(data);
  var lineSeries = this.state.ethLineSeries;
  console.log(lineSeries);
  data.push(temp);
  var pastKey = this.state.ethKey;
  lineSeries[0].data = data
  this.setState({
      ethData: data,
      ethPrice: Number(response.p),
      ethLineSeries: lineSeries,
      ethKey: pastKey+1
  })
  
}
dogeOnMessage(event){
  var response = JSON.parse(event.data)
  var utcMiliSec = response.E
  var d = new Date(0)
  d.setUTCMilliseconds(utcMiliSec)
  var temp = {time: utcMiliSec, value: response.p}
  var data = this.state.dogeData;
  console.log(data);
  var lineSeries = this.state.dogeLineSeries;
  console.log(lineSeries);
  data.push(temp);
  var pastKey = this.state.dogeKey;
  lineSeries[0].data = data
  this.setState({
      dogeData: data,
      dogePrice: Number(response.p),
      dogeLineSeries: lineSeries,
      dogeKey: pastKey+1
  })
  
}
updatePosts(){
    const user = localStorage.getItem("userID");
  
  
   axios.post("http://localhost:5000/posts/byuser", {user: user})
       .then(function(res){
         console.log(res);
           this.setState({
               posts: res.data
           });
           console.log(this.state.posts);
           
       }.bind(this)) 
       .catch(err => console.log('Error: ' + err));
}

  renderPosts(){
    if(this.state.bcPrice==0 || (this.state.ethPrice == 0|| this.state.dogePrice ==0)){
      return(<div></div>);
    }
      const posts = this.state.posts;
    if(typeof posts === "undefined"||posts.length==0){
        return(<p>You have no transaction history</p>);
    }return(<div>
        {posts.map((post) =>
            <TransactionStub post = {post} price={this.state.bcPrice}/>
        )}
    </div>)
  }
  renderNW(){
    if(this.state.bcPrice==0 || (this.state.ethPrice == 0|| this.state.dogePrice ==0)){
      return (<h3>connecting...</h3>)
    }
    return(<div>
      <h4>Current Balance($100,000 starting): ${(this.getCashVal() + this.getBCVal() + this.getDOGEVal()+ this.getETHVal()).toFixed(2)}</h4>
      <h5>Cash: ${this.getCashVal().toFixed(2)}</h5>
      <h5>Bitcoin: ${this.getBCVal().toFixed(2)}</h5>
      <h5>Ethereum: ${this.getETHVal().toFixed(2)}</h5>
      <h5>Dogecoin ${this.getDOGEVal().toFixed(2)}</h5>
      </div>)
  }
  getCashVal(){
    let val = 100000;
    const posts = this.state.posts;
    if(typeof posts === "undefined"||posts.length==0){
        return val;
    }
    for(let i = 0; i < posts.length; i++){
        const post = posts[i];
        if(post.action == "BUY"){
            val -= Number(post.quantity);
        }else{
            val += Number(post.quantity);
        }
    }
    return val;
  }
  getBCVal(){
    let val = 0;
    const posts = this.state.posts;
    if(typeof posts === "undefined"||posts.length==0){
        return val;
    }
    let bitcoins= 0;
    for(let i = 0; i < posts.length; i++){
        const post = posts[i];
        if(post.cryptoName == "Bitcoin"){
          if(post.action == "BUY"){
            bitcoins += Number(post.quantity)/Number(post.price);
          }else{
            bitcoins -= Number(post.quantity)/Number(post.price);
          }
        }
        
    }val = bitcoins * this.state.bcPrice;
    return val;
  }
  getDOGEVal(){
    let val = 0;
    const posts = this.state.posts;
    if(typeof posts === "undefined"||posts.length==0){
        return val;
    }
    let dogecoins= 0;
    for(let i = 0; i < posts.length; i++){
        const post = posts[i];
        if(post.cryptoName == "Dogecoin"){
          if(post.action == "BUY"){
            dogecoins += Number(post.quantity)/Number(post.price);
          }else{
            dogecoins -= Number(post.quantity)/Number(post.price);
          }
        }
        
    }val = dogecoins * this.state.dogePrice;
    return val;
  }
  getETHVal(){
    let val = 0;
    const posts = this.state.posts;
    if(typeof posts === "undefined"||posts.length==0){
        return val;
    }
    let eth= 0;
    for(let i = 0; i < posts.length; i++){
        const post = posts[i];
        if(post.cryptoName == "Ethereum"){
          if(post.action == "BUY"){
            eth += Number(post.quantity)/Number(post.price);
          }else{
            eth -= Number(post.quantity)/Number(post.price);
          }
        }
        
    }val = eth * this.state.ethPrice;
    return val;
  }
  //make more getters with more cryptos
  handleTypeChange(e){
    this.setState({
      type: e.target.value
    })
  }
  handleCryptoNameChange(e){
    this.setState({
      cryptoName: e.target.value
    })
  }
  onChangeQuantity(e){
    this.setState({
      quantity: e.target.value
    })
  }
  submit(){
    const quantity = this.state.quantity;
    let price = 0;
    const cash = this.getCashVal();
    const bc = this.getBCVal();
    const eth = this.getETHVal();
    const doge = this.getDOGEVal();
    const name = this.state.cryptoName;

    if(this.state.type == "BUY" && quantity> cash){
      alert("Insufficient Funds");
      return;
    }if(this.state.type == "SELL"){
      if(name == "Bitcoin"&&quantity> bc){
        alert("Insufficient Funds");
        return;
      }if(name == "Ethereum"&&quantity> eth){
        alert("Insufficient Funds");
        return;
      }if(name == "Dogecoin"&&quantity> doge){
        alert("Insufficient Funds");
        return;
      }
    }
    if(name == "Bitcoin"){
      price = this.state.bcPrice;
      if(price==0){
        alert("Still connecting");
        return;
      }
    }else if(name == "Ethereum"){
      price = this.state.ethPrice;
      if(price==0){
        alert("Still connecting");
        return;
      }
    }else{
      price = this.state.dogePrice;
      if(price==0){
        alert("Still connecting");
        return;
      }
    }
    const postData = {
      user: localStorage.getItem("userID"),
      name: name,
      action: this.state.type,
      quantity: quantity,
      price: price
    }
    axios.post("http://localhost:5000/posts/add",postData)
       .then(function(res){
         console.log(res);
           alert(res.data);
           this.updatePosts();
           
       }.bind(this)) 
       .catch(err => console.log('Error: ' + err));


  }
  renderForm(){
    if(this.state.bcPrice!=0 && (this.state.ethPrice != 0&& this.state.dogePrice !=0)){
      return(<div>
                
                <h5>Make a transaction</h5>
                <select id = "transtype" value={this.state.type} onChange={this.handleTypeChange}>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                  </select>
                  <p>$
                  <input type="number" id="quantity" 
                        required 
                        className = "form-control" 
                        value = {this.state.quantity}
                        onChange = {this.onChangeQuantity}/>
                
                worth of:</p>
                <select id = "selectedCrypto" value={this.state.cryptoName} onChange={this.handleCryptoNameChange}>
                        <option value="Bitcoin">Bitcoin</option>
                        <option value="Ethereum">Ethereum</option>
                        <option value="Dogecoin">Dogecoin</option>
                  </select>
                
                <button onClick = {this.submit}>Submit</button>
      </div>);
    }return(<div></div>);
  }
  renderPieChart(){
    if(this.state.bcPrice==0 || (this.state.ethPrice == 0|| this.state.dogePrice ==0)){
      return (<div></div>)
    }
    //Relevant amounts of money held in each catergory
    const eth = this.getETHVal();
    const btc = this.getBCVal();
    const doge = this.getDOGEVal();
    const cash = this.getCashVal();

    //TODO: display pie chart using the above values



    //place pie chart between div values below
    return(<div>
      
    </div>);
  }
  render() {
    console.log("render");
    
    return (
      <div id = "postDisplay">
        <h1>Crypto Trading Simulator</h1>
        <h1>{localStorage.getItem("username")}</h1>

          <div id = "charts" style = {{width : "700px"}}>
            <h2>Bitcoin</h2>
            <Chart lineSeries={this.state.bcLineSeries} key = {this.state.bcKey}height = {320} autoWidth/>
            <h2>Ethereum</h2>
            <Chart lineSeries={this.state.ethLineSeries} key = {this.state.ethKey}height = {320} autoWidth/>
            <h2>Dogecoin</h2>
            <Chart lineSeries={this.state.dogeLineSeries} key = {this.state.dogeKey}height = {320} autoWidth />
          </div>
          
            <this.renderNW/>
            <this.renderPieChart/>
            <this.renderForm/>
            <h2>Transaction History</h2>
            <this.renderPosts/>
            
       
      </div>
    );
  }
}
 
export default Dashboard;