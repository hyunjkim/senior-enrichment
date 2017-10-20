const router = require('express').Router();
const {Students, Campuses} = require('../../db/models');


router.param('studentId', function(req, res, next, studentId) {
  // do validation on name here
  // blah blah validation
  // log something so we know its working
  console.log('doing name validations on ' + studentId);

  // once validation is done save the new item in the req
  req.id = Number(studentId);
  // go to the next thing
  next();
})

// GET students
router.get('/',(req,res,next)=>{
  Students.findAll()
    .then(student => res.json(student))
    .catch(next);
})

// GET students/:studentId
router.get('/:studentId',(req,res,next)=>{
  Students.findById(req.id)
    .then(student => res.json(student))
    .catch(next);
})

// POST students
router.post('/',(req,res,next)=>{
  Students.create(req.body)
    .then(student => res.json(student))
    .catch(next);
})

// PUT students/:studentId
router.put('/:studentId',(req,res,next)=>{
  Students.findById(req.id)
          .then(studentInfo => {
            if(!studentInfo) res.status(500).send('NO STUDENT INFO');
            else studentInfo.update(req.body);
          })
          .catch(next);
})

// DELETE students/:id
router.delete('/:studentId',(req,res,next)=>{
  Students.destroy({where: {id:req.id}})
    .then(() => res.status(204).end())
    .catch(next);
})


module.exports = router;

