var express = require('express'),
  _ = require('lodash'),
  db_config = require('./db_config');

var app = module.exports = express.Router();
var mysql = require('mysql');


app.get('/teste', function (req, res) {
  res.status(201).send({
    result: "success"
  });
});

app.get('/sala/buscarSalas', function (req, res) {  
  var sql = 'SELECT * FROM sala';
  var sqlCount = 'SELECT COUNT(*) as contador FROM sala';

  var connection = mysql.createConnection(db_config);
  connection.query(sqlCount, function (err, rows, fields) {
    if (!err) {
      var result = JSON.stringify(rows);
      result = JSON.parse(result);
      if (result[0] && result[0].contador > 0) {
        connection.query(sql, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            res.status(200).send({
              json: result,
              result: "success"
            });
          } else {
            console.log(err);
            res.status(400).send({
              result: "database_error"
            });
          }
        });
        connection.end();
      } else {
        res.status(400).send({
          result: "no_records"
        });
      }
    } else {
      res.status(400).send({
        result: "database_error"
      })
    }
  });
});

app.post('/sala/insereSala', function (req, res) {
  var dados = { nome: req.body.nome };
  var comando = 'INSERT INTO sala SET ?';
  var connection = mysql.createConnection(db_config);
  connection.query(comando, dados, function (err, result) {
    if (!err) {
      res.status(201).send({
        result: "success"
      });
    } else {
      res.status(400).send({ result: "database_error" });
    }
  });
});
