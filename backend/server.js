const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true }).
    catch(error => console.log(error));

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
})

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running out of port: ${port}`);
});