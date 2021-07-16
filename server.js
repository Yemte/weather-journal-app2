
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server

const port = 4000;
app.listen(port, listening);
function listening(){
    console.log(`Srver is runing on port ${port}`);
}
// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req,res){
    console.log(projectData);
    res.send(projectData);
}

// Post Route
app.post('/addData', addData);
function addData(req, res){
      projectData = {
        date:req.body.date,
        temp : req.body.temp,
        content:req.body.content
    } 
    console.log(projectData);
    
    
    
}