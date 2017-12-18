var express = require('express');
var router = express.Router();
var path = require('path');
var encryptLib = require('../modules/encryption');

var mssql = require('mssql');


var conn = new mssql.ConnectionPool({
    database: "loetzgames",
    server: "DESKTOP-OP688V3\SQLEXPRESS",
    options: {
        trustedConnection: true
    }
});



// Handles request for HTML file
router.get('/', function(req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password)
  };
  console.log('new user:', saveUser);

  conn.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    sql.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [saveUser.username, saveUser.password],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
  });

});


module.exports = router;
