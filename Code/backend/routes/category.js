const router = require('express').Router();
let Category = require('../models/categoryModel');

router.route('/').get((req, res) => {
    Category.find()
    .then(category => res.json(category))
    .catch(err => res.status(400).json('Error: ' + err));               //get category
});

router.route('/add').post((req, res) => {
  const category_name = req.body.category_name;

  const newCategory = new Category({category_name});

  newCategory.save()
    .then(() => res.json('category added!'))
    .catch(err => res.status(400).json('Error: ' + err));                   //add/save Category
});


router.route('/:id').get((req, res) => {                //get category_name by id
    Category.findById(req.params.id)
      .then(category => res.json(category))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/:id').delete((req, res) => {             //delete category data
    Category.findByIdAndDelete(req.params.id)
      .then(() => res.json('Category deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {            //update category data
    Category.findById(req.params.id)
      .then(category => {
        category.category_name = req.body.category_name;
        
        category.save()
          .then(() => res.json('category updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;