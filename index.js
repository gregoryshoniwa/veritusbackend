const express = require("express");
global.sql = require('mssql');
global.mysql  = require('mysql');
var upload = require('express-fileupload');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var async = require('async');
global.path = require('path');

require('./routes')(app) 

var port = 3000;
app.use(upload());


global.veritassys = mysql.createPool({
  connectionLimit : 5000,
  multipleStatements: "true",
  host: "127.0.0.1",
  user: "root",
  password: "JesusChrist@@11",
  database: "veritassys",
  port: 3306
});

veritassys.getConnection(err => {
  if (!err) {
    console.log("Veritassys connection Successful.");
  } else {
    console.log(
      "Veritassys connection failed  \n Error :" + JSON.stringify(err, undefined, 2)
    );
  }
});

app.listen(port,()=>{
  console.log('Listening on port ' + port);

})

// var dbConfig = {
//   user: 'sa',
//   password: 'jesuschrist',
//   server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
//   database: 'veritassys',      
//   port: 1433,
//   options: {
//     abortTransactionOnError: true, // <-- SET XACT_ABORT ON
//     encrypt: false,
//     enableArithAbort: false
//   }
// }; 

// global.pool1 = new sql.ConnectionPool(dbConfig);
// global.pool1Connect = pool1.connect();
// pool1.on('error', err => {
//   console.log('Database Connection Failed! Bad Config: ', err)
// })

// Static files
// Static files
app.use(express.static("public"));

app.get("/", (req,res) =>{
	res.send('index.html');

});
app.use('/uploads',express.static("uploads"));


app.post('/upload', async (req, res) => {
    if(req.files){
      var file = req.files.file
      var filename = Date.now()+file.name.replace(/\s/g, '');

      file.mv('./uploads/' + filename,function(err){
        if(err){
          res.send({error:err})
        }else{
          res.send({message:'success',filename:filename})
        }
      })
    }
}) 

 
