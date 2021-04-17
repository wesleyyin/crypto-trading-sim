import React, { Component } from 'react';
import axios from 'axios';

//pass in post and current prices
export default class TransactionStub extends Component{
    constructor(props){
        super(props)
        
        
    }
    
    
    
    render(){
        const transaction = this.props.post;
        if(transaction.action == 'BUY'){
            return (
                <div>
                    <p>Bought {transaction.quantity} worth of {transaction.cryptoName} at {transaction.price}</p>
                </div>
    
            )
        }
        return (
            <div>
                <p>Sold {transaction.quantity} worth of {transaction.cryptoName} at {transaction.price}</p>
            </div>

        )
    }
}