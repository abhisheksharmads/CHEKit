const router = require('express').Router();
let Claim = require('../models/claimModel');


router.route('/').get((req, res) => {
    Claim.find({ isfact: false})
      .then(claim => res.json(claim))
      .catch(err => res.status(400).json('Error: ' + err));          //get claim
  });

  router.route('/facts').get((req, res) => {
    Claim.find({ isfact: true})
      .then(claim => res.json(claim))
      .catch(err => res.status(400).json('Error: ' + err));          //get claim
  });
  
  router.route('/add').post((req, res) => {                 
    const name = req.body.name;
    const description = req.body.description;
              //add claim
    const category = req.body.category;
    const source = req.body.source;
    const user_id = req.body.user_id;
    const isfact = false;
    
    const newClaim = new Claim({
        name,
        description,
        category,
        source,
        user_id,
        isfact
    });
  
    newClaim.save()
    .then(() => res.json('claim added!'))
    .catch(err => res.status(400).json('Error: ' + err));        //save claim
  });

  router.route('/:id').get((req, res) => {                //get claim details by id
    Claim.findById(req.params.id)
      .then(claim =>{
        
        claim.hit_counter = claim.hit_counter + 1;

        claim.save()
          .then(() => res.json(claim))

       })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {             //delete claim data
    Claim.findByIdAndDelete(req.params.id)
      .then(() => res.json('Claim deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {            //update claim data
    Claim.findById(req.params.id)
      .then(claim => {
        claim.name = req.body.name;
        claim.description = req.body.description;
        claim.category = req.body.category;
        claim.source = req.body.source;
        claim.user_id = req.body.user_id;

        claim.save()
          .then(() => res.json('Claim updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/updateToFact/:id').post((req, res) => {            //update claim data
    Claim.findById(req.params.id)
      .then(claim => {
         claim.isfact = true        

        claim.save()
          .then(() => res.json('Claim updated ot fact'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/search').post((req, res) => {            //update claim data
   // Claim.find({ $or: [{ name : req.body.search } , { description: req.body.search }] })
   console.log("Search facts by  " +  req.body.search);
   
  //  /{ $and: [ { category : _id }, { isfact : false }] }
   Claim.find({ $and: [ { name : new RegExp(req.body.search, 'i') }, { isfact: true }]})  
    .then(claim => res.json(claim))
    .catch(err => res.status(400).json('Error: ' + err));

  });

  
router.route('/category/:id').get((req, res) => {
    const _id = req.params.id;
    console.log("By Category " + _id);
    Claim.find({ $and: [ { category : _id }, { isfact : false }] })
    .then(claim => res.json(claim))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/facts/category/:id').get((req, res) => {
  const _id = req.params.id;
  console.log("By Category facts" + _id);
  Claim.find({ $and: [ { category : _id }, { isfact : true }] })
  .sort({hit_counter:-1}) 
  .then(claim => res.json(claim))
  .catch(err => res.status(400).json('Error: ' + err));
});
 

module.exports = router;