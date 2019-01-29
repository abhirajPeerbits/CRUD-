const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const  mongoose  = require('./db.js');
const   employeeController  = require('./controllers/employeeController.js');


var app = express();

app.use(bodyParser.json());

//allow us to getrequest from any portnumber or domian
app.use(cors({origin :'http://localhost:4200'}));

app.listen(3000,() => console.log("server start at port number : 3000"));

app.use('/employee',employeeController);