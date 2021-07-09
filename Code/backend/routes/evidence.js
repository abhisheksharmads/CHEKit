const router = require('express').Router();
let Evidence = require('../models/evidenceModel');
let Claim = require('../models/claimModel');

router.route('/').get((req, res) => {
    Evidence.find()
      .then(claim => res.json(claim))
      .catch(err => res.status(400).json('Error: ' + err));          //get claim
  });
  
  router.route('/add').post((req, res) => {

    const evidence = req.body.evidence;
    const url = req.body.url;
    const claim = req.body.claim;
    const source = req.body.source;
    const upcount = req.body.upcount;
    const downcount = req.body.downcount;
    //const claim_id = req.body.claim_id;                 
    const verdict = req.body.verdict;  
   
    const newEvidence = new Evidence({
        evidence,
        url,
        claim,
        source,
        upcount,
        downcount,
        verdict,
       // claim_id
    });

    
    Claim.findById(claim)
    .then(claim => {
       claim.isfact = true     

      claim.save()
           .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
    

    newEvidence.save()
    .then(() => res.json('Evidence added!'))
    .catch(err => res.status(400).json('Error: ' + err));        //save claim
  
  });

  router.route('/:id').get((req, res) => {                //get claim details by id
    Evidence.findById(req.params.id)
      .then(claim => res.json(claim))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/byclaim/:id').get((req, res) => {                //get verdict by id
    Evidence.findOne({claim : req.params.id})
      .then(evidence => res.json(evidence))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {             //delete claim data
    Evidence.findByIdAndDelete(req.params.id)
      .then(() => res.json('Evidence deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {            //update claim data
    Evidence.findById(req.params.id)
      .then(claimItem => {
        claimItem.evidence = req.body.name;
        claimItem.url = req.body.description;
        claimItem.claim = req.body.evidence;
        claimItem.source = req.body.source;
        claimItem.upcount = req.body.upcount;
        claimItem.downcount = req.body.downcount;
        //claimItem.claim_id = req.body.claim_id;
        

        claimItem.save()
          .then(() => res.json('Evidence updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
router.route('/claim/:id').get((req, res) => {
    const _id = req.params.id;
    console.log("By Category " + _id);
    Evidence.find({ claim : _id })
    .then(claim => res.json(claim))
    .catch(err => res.status(400).json('Error: ' + err));
});
 
router.route('/vote/:id').post((req, res) => {
  Evidence.findById(req.params.id)
      .then(claimItem => {
      
      if(req.body.upcount != null ){
        claimItem.upcount = req.body.upcount;
      }

      if(req.body.downcount != null ){
        claimItem.downcount = req.body.downcount;
      }
        //claimItem.claim_id = req.body.claim_id;        

        claimItem.save()
          .then(() => res.json('Evidence vote updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;