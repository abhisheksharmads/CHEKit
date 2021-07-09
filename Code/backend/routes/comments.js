const router = require('express').Router();
let Comments = require('../models/commentsModel');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
    Comments.find()
      .then(comments => res.json(comments))
      .catch(err => res.status(400).json('Error: ' + err));                 //get comments
  });
  
  router.route('/add').post((req, res) => {
    const comment_text = req.body.comment_text;
    const user_id = req.body.user_id;
    const claim_id = req.body.claim_id;                 //add users

  
    const newComments = new Comments({
        comment_text,
        user_id,
        claim_id,
    });
  
    newComments.save()
    .then(() => res.json('comment added!'))
    .catch(err => res.status(400).json('Error: ' + err));           //save users
  });

  router.route('/:id').get((req, res) => {                //get comment by id
    Comments.findById(req.params.id)
      .then(comments => res.json(comments))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/claim/:id').get((req, res) => {                //get comment by id
    console.log("Comments Claim ID: " + req.params.id);
    Comments
    //.find({claim_id  : req.params.id})
    .aggregate([
      { $match : { claim_id : mongoose.Types.ObjectId(req.params.id) } },
      {
          "$lookup": {
              "from": "users",
              "localField": "user_id",
              "foreignField": "_id",
              "as": "User"
          }
      }
    ]).exec((err, comments) => {
        if (err) throw err;
        console.log(comments);
        res.json(comments);
    })
    //  .then(comments => res.json(comments))
     // .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/:id').delete((req, res) => {             //delete comment
    Comments.findByIdAndDelete(req.params.id)
      .then(() => res.json('comment deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {            //update comment
    Comments.findById(req.params.id)
      .then(comments => {
        comments.comment_text = req.body.comment_text;
        comments.user_id = req.body.user_id;
        comments.claim_id = req.body.claim_id;
        
        comments.save()
          .then(() => res.json('comment updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;