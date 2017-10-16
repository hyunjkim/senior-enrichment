const router = require('express').Router();
const {Students, Campuses} = require('../db/models');


// GET api/students
router.get('/',(req,res,next)=>{
  Students.findAll()
    .then(student => res.json(student))
    .catch(next);
})

// POST api/students/
.post((req,res,next)=>{
  Students.create(req.body)
    .then(student => res.json(student))
    .catch(next);
})

// DELETE api/students/:id
.delete('/:studentId',(req,res,next)=>{
  const id = req.params.studentId;

  Students.destroy({where: {studentId}})
    .then(() => res.status(204).end())
    .catch(next);
})


module.exports = router;
