import React, { Component } from 'react';
import axios from 'axios';

//pass in post and current prices
export default class TransactionStub extends Component{
    constructor(props){
        super(props)
        
        
    }
    
    
    
    render(){
        const transaction = this.props.post;
        const date = new Date(transaction.createdAt)
        if(transaction.action == 'BUY'){
            return (
                <div>
                    <h5>{date.toDateString()}</h5>
                    <p>Bought {transaction.quantity} worth of {transaction.cryptoName} at {transaction.price}</p>
                </div>
    
            )
        }
        return (
            <div>
                <h5>{date.toDateString()}</h5>
                <p>Sold {transaction.quantity} worth of {transaction.cryptoName} at {transaction.price}</p>
            </div>

        )
    }
}