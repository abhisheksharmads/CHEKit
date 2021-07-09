const router = require('express').Router();
let Verdict = require('../models/verdictModel');

router.route('/').get((req, res) => {
    Verdict.find()
      .then(verdict => res.json(verdict))
      .catch(err => res.status(400).json('Error: ' + err));                 //get users
  });
  
  router.route('/add').post((req, res) => {
    const upcount = req.body.upcount;
    const downcount = req.body.downcount;
    const claim_id = req.body.claim_id;                 //add users
    const isTrue = req.body.isTrue;   
  
    const newVerdict = new Verdict({
        upcount,
        downcount,
        isTrue,
        claim_id,
    });
  
    newVerdict.save()
    .then(() => res.json('verdict added!'))
    .catch(err => res.status(400).json('Error: ' + err));           //save verdicts
  });

  router.route('/:id').get((req, res) => {                //get verdict by id
    Verdict.findById(req.params.id)
      .then(verdict => res.json(verdict))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/byclaim/:id').get((req, res) => {                //get verdict by id
    Verdict.findOne({claim_id : req.params.id})
      .then(verdict => res.json(verdict))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {             //delete verdict data
    Verdict.findByIdAndDelete(req.params.id)
      .then(() => res.json('verdict deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {            //update verdict data
    Verdict.findById(req.params.id)
      .then(verdict => {
        verdict.upcount = req.body.upcount;
        verdict.downcount = req.body.downcount;
        verdict.claim_id = req.body.claim_id;
        

        verdict.save()
          .then(() => res.json('verdict updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;