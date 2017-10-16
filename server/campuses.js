const router = require('express').Router();
const {Students, Campuses} = require('../db/models');


// GET api/campuses
router.get('/',(req,res,next)=>{
  Campuses.findAll()
    .then(campus => res.json(campus))
    .catch(next);
})

// POST api/campuses/
.post((req,res,next)=>{
  Campuses.create(req.body)
    .then(campus => res.json(campus))
    .catch(next);
})

router.param('id', function(req, res, next, id) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + id);

    // once validation is done save the new item in the req
    req.id = id;
    // go to the next thing
    next();
})

// GET api/campuses/:id
.get((req,res,next)=>{
  Campuses.findById(req.id)
    .then(campus => res.json(campus))
    .catch(next);
})

// PUT api/campuses/:id
.put((req,res,next)=>{
  Campuses.findOrCreate({where: {id:req.id}})
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
     })
    .catch(next);
})

// DELETE api/campuses/:id
.delete((req,res,next)=>{
  Campuses.destroy({where: {id:req.id}})
    .then(() => res.status(204).end())
    .catch(next);
})

module.exports = router;
