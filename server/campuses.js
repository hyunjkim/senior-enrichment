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

// DELETE api/campuses/:id
.delete('/:id',(req,res,next)=>{
  const id = req.params.id;

  Campuses.destroy({where: {id}})
    .then(() => res.status(204).end())
    .catch(next);
})

module.exports = router;
