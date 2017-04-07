var express = require('express'); 
var cors = require('cors'); 
var app = express(); 
var bodyParser = require('body-parser') 
app.use(bodyParser.json()); // support json encoded bodies 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies 
app.use(cors()); 

var mysql = require('mysql'); 

connectionpool = mysql.createPool({ 
    connectionLimit : 20,
    host : 'localhost', 
    user : 'root', 
    password : 'serafim1997', 
    database : 'shop' 
}); 

var routerUser = require('./user'); 
var routerCategory = require('./category');
var routerItem = require('./item');
var routerBody = require('./body');

app.use('/user', routerUser); 
app.use('/category', routerCategory); 
app.use('/item', routerItem); 
app.use('/body', routerBody); 

app.listen(8888, function () { 
console.log('Example app listening on port 8888!'); 
});

app.get('/fulltext', function(req, res) { 
    console.log("Horror")
    receiveContent()   
}); 

module.exports = connectionpool