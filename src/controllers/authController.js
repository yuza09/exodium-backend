var pool = require('../db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.register = function(req, res) {
  var u = req.body.username;
  var e = req.body.email;
  var p = req.body.password;
  var r = req.body.race;
  bcrypt.hash(p, 10).then(function(h) {
    var sql = 'INSERT INTO players (username,email,password_hash,race) VALUES ($1,$2,$3,$4) RETURNING id,username,race';
    return pool.query(sql, [u, e, h, r]);
  }).then(function(result) {
    var pl = result.rows[0];
    var token = jwt.sign({id: pl.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.status(201).json({token: token, player: pl});
  }).catch(function(err) {
    console.error(err.message);
    res.status(500).json({error: err.message});
  });
};

exports.login = function(req, res) {
  res.json({ok: true});
};

exports.me = function(req, res) {
  res.json({ok: true});
};