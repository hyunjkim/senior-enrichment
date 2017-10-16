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

router.param('studentId', function(req, res, next, studentId) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + studentId);

    // once validation is done save the new item in the req
    req.id = studentId;
    // go to the next thing
    next();
})

// GET api/students/:id
.get((req,res,next)=>{
  Students.findById(req.id)
    .then(student => res.json(student))
    .catch(next);
})

// PUT api/students/
.put((req,res,next)=>{
  Students.findOrCreate({where: {studentId:req.id}})
  .spread((student, created) => {
    console.log(student.get({
      plain: true
    }))
   })
  .catch(next);
})

// DELETE api/students/:id
.delete((req,res,next)=>{
  Students.destroy({where: {studentId:req.id}})
    .then(() => res.status(204).end())
    .catch(next);
})


module.exports = router;
