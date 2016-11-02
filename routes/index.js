const express = require('express');
const router = express.Router();
const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function generateJWT(id, user_name, email){
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 30)
  let returnMe =  jwt.sign({
    _id: id,
    user_name: user_name,
    email: email,
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET')
  return returnMe
}

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
            let user = results[0]
            let newJWT = generateJWT(user.id, user.user_name, user.email)
            res.send({jwt:newJWT})
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
      delete user.hashed_pw;
      if (passwordMatch === false) {
        res.send(false)
      } else {
        let newJWT = generateJWT(user.id, user.user_name, user.email)
        res.send({jwt:newJWT})
      }
    }
  })
})

module.exports = router;
