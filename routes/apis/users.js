

module.exports = function(app) {

    app.get('/getAllUsers', async (req, res) => {
      
        var query = `SELECT B.userId,B.firstName,B.lastName,B.emailAddress,B.status,CONCAT(A.firstName,' ',A.lastName) as createdBy,T0.id as usertype FROM users A,users B inner join usertype T0 on B.usertype = T0.id WHERE A.userId = B.createdBy`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

    app.post('/getUser', (req, res) => {
      
          var query = `SELECT B.userId,B.firstName,B.lastName,B.emailAddress,B.status,CONCAT(A.firstName,' ',A.lastName) as createdBy,T0.id as usertype FROM users A,users B inner join usertype T0 on B.usertype = T0.id WHERE A.userId = B.createdBy AND B.emailAddress = '${req.body.emailAddress}' AND B.userPassword = '${req.body.userPassword}' and B.status = 1`;
         
          
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      }) 

      app.post('/addUser', async (req, res) => {
        
          var query = `INSERT INTO users (firstName,lastName,emailAddress,userPassword,createdBy,usertype) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.emailAddress}','${req.body.userPassword}',${req.body.createdBy},${req.body.usertype})`;
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
       
         
       
      })

      

      app.post('/updateUser', async (req, res) => {
        
          var query = `UPDATE users SET firstName = '${req.body.firstName}',lastName = '${req.body.lastName}',emailAddress = '${req.body.emailAddress}',usertype = '${req.body.usertype}' WHERE userId = '${req.body.userId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

      app.post('/updatePassword', async (req, res) => {
        
          var query = `UPDATE users SET userPassword = '${req.body.userPassword}' WHERE userId = '${req.body.userId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      })

      app.post('/updateStatus', async (req, res) => {
      
          var query = `UPDATE users SET status = '${req.body.status}' WHERE userId = '${req.body.userId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      })


}

 function queryHandler(query) {
   
  
    veritassys.query(query, function (error, results, fields) {
      // When done with the connection, release it.
      if (!error) {
          
          return error;
          
				} else {
          
          return results;
				}
    });
 
  
}

