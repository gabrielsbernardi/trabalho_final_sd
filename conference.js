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

app.get('/sala/buscarSala/:id', function (req, res) {
  var sql = 'SELECT * FROM sala WHERE id = ' + req.params.id;
  var sqlCount = 'SELECT COUNT(*) as contador FROM sala WHERE id = ' + req.params.id;

  var connection = mysql.createConnection(db_config);
  connection.query(sqlCount, function (err, rows, fields) {
    if (!err) {
      var result = JSON.stringify(rows);
      result = JSON.parse(result);
      if (result[0] && result[0].contador > 0) {        
        connection.query(sql, function(err, rows, fields) {
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

app.get('/cadastro-tipo/buscarTipo/:id', function (req, res) {
  var token = req.headers.token;
  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.status(400).send({ result: "not_authorized" });
      } else {
        var sql = 'SELECT t.cd_tipo_bebida, t.nm_tipo_bebida, t.ds_tipo_bebida FROM t_tipo_bebida t WHERE t.cd_tipo_bebida = ' + req.params.id;
        var sqlCount = 'SELECT COUNT(*) as count FROM t_tipo_bebida t WHERE t.cd_tipo_bebida = ' + req.params.id;

        var connection = mysql.createConnection(db_config);

        connection.query(sqlCount, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            if (result[0] != undefined && result[0].count > 0) {
              connection.query(sql, function (err, rows, fields) {
                if (!err) {
                  var result = JSON.stringify(rows);
                  result = JSON.parse(result);
                  res.status(201).send({
                    json: result,
                    result: "success"
                  });
                } else {
                  res.status(400).send({ result: "database_error" });
                }
              });
              connection.end();
            } else {
              res.status(400).send({ result: "no_records" });
            }
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});


app.get('/tipo/all', function (req, res) {
  var token = req.headers.token;

  if (true) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (!err) {
        res.status(400).send({ result: "not_authorized" });
      } else {

        var sqlCount = 'SELECT COUNT(*) as count FROM t_tipo_bebida t ';
        var sql = 'SELECT cd_tipo_bebida, nm_tipo_bebida FROM t_tipo_bebida ';

        var connection = mysql.createConnection(db_config);

        connection.query(sqlCount, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            if (result[0] != undefined && result[0].count > 0) {
              connection.query(sql, function (err, rows, fields) {
                if (!err) {
                  var result = JSON.stringify(rows);
                  result = JSON.parse(result);
                  res.status(201).send({
                    json: result,
                    result: "success"
                  });
                } else {
                  res.status(400).send({ result: "database_error" });
                }
              });
            } else {
              res.status(400).send({ result: "no_records" });
            }
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});


app.get('/cadastro-tipo/buscarCaracteristica/:id', function (req, res) {
  var token = req.headers.token;

  if (true) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (!err) {
        res.status(400).send({ result: "not_authorized" });
      } else {

        var sqlCount = 'SELECT COUNT(*) as count FROM t_carac_tipo_bebida t WHERE t.cd_tipo_bebida = ' + req.params.id;
        var sql = 'SELECT cd_carac_tipo_bebida, nm_carac_tipo_bebida FROM t_carac_tipo_bebida WHERE cd_tipo_bebida = ' + req.params.id;

        var connection = mysql.createConnection(db_config);

        connection.query(sqlCount, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            if (result[0] != undefined && result[0].count > 0) {
              connection.query(sql, function (err, rows, fields) {
                if (!err) {
                  var result = JSON.stringify(rows);
                  result = JSON.parse(result);
                  res.status(201).send({
                    json: result,
                    result: "success"
                  });
                } else {
                  res.status(400).send({ result: "database_error" });
                }
              });
              connection.end();
            } else {
              res.status(400).send({ result: "no_records" });
            }
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});

app.delete('/cadastro-tipo/deleteCaracteristica', function (req, res) {
  var token = req.headers.token;

  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.status(400).send({ result: "not_authorized" });
      } else {
        var sqlDelete = 'DELETE FROM t_carac_tipo_bebida WHERE cd_tipo_bebida = ' + req.body.cdTipoBebida + ' AND cd_carac_tipo_bebida = ' + req.body.cdCaracteristica;
        var sqlCount = 'SELECT COUNT(*) as count FROM t_carac_bebida WHERE cd_carac_tipo_bebida = ' + req.body.cdCaracteristica;
        var connection = mysql.createConnection(db_config);
        connection.query(sqlCount, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            if (result[0] == undefined || result[0].count == 0) {
              connection.query(sqlDelete, function (err, result) {
                if (!err) {
                  res.status(201).send(
                    { result: "success" }
                  );
                } else {
                  res.status(400).send({ result: "database_error" });
                }
              });
            } else {
              res.status(400).send({ result: "integ_ref_error" });
            }
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});


app.delete('/cadastro-tipo/delete', function (req, res) {
  var token = req.headers.token;

  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.status(400).send({ result: "not_authorized" });
      } else {

        console.log("req.body.id " + req.body.id);
        if (!req.body.id) {
          console.log("ERRO FORA ");
          res.status(400).send({ result: "no_records" });
          return;
        }

        var sqlDelete = 'DELETE FROM t_tipo_bebida WHERE cd_tipo_bebida = ' + req.body.id;
        var sqlCount = 'SELECT COUNT(*) as count FROM t_tipo_bebida WHERE cd_tipo_bebida = ' + req.body.id;
        var connection = mysql.createConnection(db_config);
        console.log("sqlDelete " + sqlDelete);
        console.log("sqlCount " + sqlCount);
        connection.query(sqlCount, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            if (result[0] != undefined && result[0].count > 0) {
              var sqlCountBebida = 'SELECT COUNT(*) as count FROM t_bebida WHERE cd_tipo_bebida = ' + req.body.id;
              console.log("sqlCountBebida " + sqlCountBebida);
              connection.query(sqlCountBebida, function (err, rows, result) {
                if (!err) {
                  var result = JSON.stringify(rows);
                  result = JSON.parse(result);
                  if (result[0] != undefined && result[0].count > 0) {
                    res.status(400).send({ result: "bebida_records" });
                  } else {
                    var sqlCaractetica = 'DELETE FROM t_carac_tipo_bebida WHERE cd_tipo_bebida = ' + req.body.id;
                    connection.query(sqlCaractetica, function (err, rows, result) {
                      if (!err) {
                        connection.query(sqlDelete, function (err, rows, result) {
                          console.log("ERR " + err);
                          if (!err) {
                            res.status(201).send(
                              { result: "success" }
                            );
                          } else {
                            res.status(400).send({ result: "database_error" });
                          }
                        });
                      } else {
                        console.log("Erro ao excluir os tipos");
                        res.status(400).send({ result: "database_error" });
                      }
                    });
                  }
                } else {
                  res.status(400).send({ result: "database_error" });
                }
              });
            } else {
              res.status(400).send({ result: "no_records" });
            }
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});

app.put('/cadastro-tipo/salvarTipo', function (req, res) {

  var token = req.headers.token;

  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.status(400).send({ result: "not_authorized" });
      } else {
        var comando = "";
        var dados = { nm_tipo_bebida: req.body.nmTipoBebida, ds_tipo_bebida: req.body.dsTipoBebida };
        if (req.body.cdTipoBebida > 0) {
          comando = 'UPDATE t_tipo_bebida SET nm_tipo_bebida = "' + req.body.nmTipoBebida + '", ds_tipo_bebida = "' + req.body.dsTipoBebida + '" WHERE cd_tipo_bebida = ' + req.body.cdTipoBebida;
        } else {
          comando = 'INSERT INTO t_tipo_bebida SET ?';
        }
        var connection = mysql.createConnection(db_config);
        connection.query(comando, dados, function (err, result) {
          if (!err) {
            var id = req.body.cdTipoBebida > 0 ? req.body.cdTipoBebida : result.insertId;
            res.status(201).send({
              json: JSON.parse(id),
              result: "success"
            });
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});

app.post('/cadastro-tipo/adicionarCaracteristica', function (req, res) {
  var token = req.headers.token;

  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.status(400).send({ result: "not_authorized" });
      } else {

        var dados = { cd_tipo_bebida: req.body.cdTipoBebida, nm_carac_tipo_bebida: req.body.dsCaracteristica };
        var comando = 'INSERT INTO t_carac_tipo_bebida SET ?';
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
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});

app.post('/gestao-tipo/pesquisa', function (req, res) {
  var token = req.headers.token;

  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.status(400).send({ result: "not_authorized" });
      } else {

        var sql = `SELECT tb.cd_tipo_bebida, tb.nm_tipo_bebida, tb.ds_tipo_bebida, false as edit `
        var from = ` FROM t_tipo_bebida tb LEFT JOIN t_carac_tipo_bebida ctb ON ctb.cd_tipo_bebida = tb.cd_tipo_bebida `
        var group = ` GROUP BY tb.cd_tipo_bebida `
        var where = " WHERE 1=1 "
        var isWhere = false

        if (req.body.caracteristica) {
          isWhere = true;
          where += " AND ctb.nm_carac_tipo_bebida LIKE '%" + req.body.caracteristica + "%' "
        }

        if (req.body.nome) {
          isWhere = true;
          where += " AND tb.nm_tipo_bebida LIKE '%" + req.body.nome + "%' "
        }

        if (req.body.descricao) {
          isWhere = true;
          where += " AND tb.ds_tipo_bebida LIKE '%" + req.body.descricao + "%' "
        }

        var sqlCount = " SELECT COUNT(*) as count " + from;

        if (isWhere) {
          sqlCount += " " + where;
        }

        sqlCount += group

        var connection = mysql.createConnection(db_config);

        connection.query(sqlCount, function (err, rows, fields) {
          if (!err) {
            var result = JSON.stringify(rows);
            result = JSON.parse(result);
            if (result[0] != undefined && result[0].count > 0) {
              sql += from
              if (isWhere) {
                sql += where
              }
              sql += group
              connection.query(sql, function (err, rows, fields) {
                if (!err) {
                  var result = JSON.stringify(rows);
                  result = JSON.parse(result);
                  res.status(201).send({
                    json: result,
                    result: "success"
                  });
                } else {
                  res.status(400).send({ result: "database_error" });
                }
              });
              connection.end();
            } else {
              res.status(400).send({ result: "no_records" });
            }
          } else {
            res.status(400).send({ result: "database_error" });
          }
        });
      }
    });
  } else {
    res.status(400).send({ result: "not_authorized" });
  }
});
