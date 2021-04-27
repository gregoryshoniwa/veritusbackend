//const { query, response } = require("express");

module.exports = function(app) {

    app.get('/getAllTransaction', async (req, res) => {
      
        var query = `select T0.financialId,T0.estateId,T0.debitamount,T0.creditamount,T0.details,T0.createdAt,T0.updatedAt,CONCAT(T1.firstName,' ',T1.lastName) as createdBy from financials T0
        inner join users T1 on T0.createdBy = T1.userId`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
    })

    app.post('/getEstateDoc', async (req, res) => {
      
        
          var query = `select T0.id,T0.estateId,T0.docName,T0.docType,CONCAT(T1.firstName,' ',T1.lastName) as createdBy from estateDocuments T0 inner join users T1 on T0.createdBy = T1.userId WHERE estateId = '${req.body.estateId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      }) 

      app.post('/checkEstateDoc', async (req, res) => {
      
        
        var query = `select T0.id,T0.estateId,T0.docName,T0.docType,CONCAT(T1.firstName,' ',T1.lastName) as createdBy from estateDocuments T0 inner join users T1 on T0.createdBy = T1.userId WHERE estateId = '${req.body.estateId}'`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
    }) 

      app.post('/getEstateDocNames', async (req, res) => {
      
        
        var query = `select * FROM docTypeNames WHERE docTier = '${req.body.docTier}'`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
    }) 

    app.get('/getDoc/:doc', async (req, res) => {
      
        
      res.download(`uploads/${req.params.doc}`);
  }) 

    app.post('/getEstateDocNamesAttachment', async (req, res) => {
      
        
      var query = `select * FROM estateDocuments WHERE estateid = '${req.body.estateId}'`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
  }) 

  app.post('/getEstateDocCheck', async (req, res) => {
      
        
    var query = `SELECT docTypeName FROM estateDocuments where estateId = '${req.body.estateId}' and docType = 1`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
}) 

app.post('/getEstateDocCheck2', async (req, res) => {
      
        
  var query = `SELECT docTypeName FROM estateDocuments where estateId = '${req.body.estateId}' and docType = 2`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
}) 


app.post('/getEstateDocCheck3', async (req, res) => {
      
        
  var query = `SELECT docTypeName FROM estateDocuments where estateId = '${req.body.estateId}' and docType = 3`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
}) 

      app.post('/addEstateDoc', async (req, res) => {
        
          var query = `INSERT INTO estateDocuments (estateId,docName,docType,docTypeName,createdBy) VALUES ('${req.body.estateId}','${req.body.docName}','${req.body.docType}','${req.body.docTypeName}','${req.body.createdBy}')`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

      

      app.post('/updateTransaction', async (req, res) => {
         
          var query = `UPDATE financials SET details = '${req.body.details}',debitamount = '${req.body.debitamount}',creditamount = '${req.body.creditamount}' WHERE financialId = '${req.body.financialId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

     


}

async function queryHandler(query) {
  await pool1Connect; // ensures that the pool has been created
  try {
      const request = pool1.request(); // or: new sql.Request(pool1)
      const result = await request.query(query)
     // console.log(result)
      return result;
  } catch (err) {
      //console.error('SQL error', err);
      return err
  }
}

