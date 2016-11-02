const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt')

/* GET home page. */
router.post('/signup', function(req, res, next) {
  knex('users').where('user_name', req.body.user_name)
    .then(function(results) {
      if (results.length >= 1) {
        res.send(false)
      } else {
        knex('users')
          .returning('*')
          .insert({
            user_name: req.body.user_name,
            email: req.body.email,
            hashed_pw: bcrypt.hashSync(req.body.password, 12)
          })
          .then(function(results) {
            res.send(results)
          })
      }
    })
});

router.post('/login', function(req, res, next) {
  console.log('login attempt received. req.body: ', req.body);
  knex('users').where('user_name', req.body.user_name).then(function(results) {
    if (results.length == 0) {
      res.send(false)
    } else {
      var user = results[0];
      var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_pw)
      delete user.password;
      if (passwordMatch === false) {
        res.send(false)
      } else {
        res.send(user)
      }
    }
  })
})

module.exports = router;
