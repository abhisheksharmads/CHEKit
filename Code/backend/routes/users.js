const router = require('express').Router();
let User = require('../models/userModel');

router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));                 //get users
  });
  
  router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;                 //add users

    console.log(username, email, password );
    
    const newUser = new User({
      username,
      email,
      password,
    });
    
    newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));           //save users
  });


  router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email, password: password})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error:' + err));
  });


  



  module.exports = router;

