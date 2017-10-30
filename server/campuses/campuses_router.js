const router = require('express').Router();
const {Students, Campuses} = require('../../db/models');


router.param('id', function(req, res, next, campusId) {
  // do validation on name here
  // blah blah validation
  // log something so we know its working
  console.log('doing name validations on ' + campusId);

  // once validation is done save the new item in the req
  req.id = campusId;
  // go to the next thing
  next();
})

// GET campuses
router.get('/',(req,res,next)=>{
  Campuses.findAll()
    .then(campus => res.json(campus))
    .catch(next);
})

// GET campuses/:campusId
router.get('/:campusId',(req,res,next)=>{
  const campusId = req.params.campusId;

  Campuses.findOne({
      where:{id:campusId},
      include:[{all: true}]
    })
    .then(campus => res.json(campus))
    .catch(next);
})

// POST campuses/
router.post('/',(req,res,next)=>{
  Campuses.create(req.body)
    .then(campus => res.json(campus))
    .catch(next);
})

// PUT campuses/:campusId
router.put('/:id',(req,res,next)=>{
   Campuses.findById(req.id)
          .then(campusInfo => {
            if(!campusInfo) res.status(500).send('NO CAMPUS INFO');
            else campusInfo.update(req.body);
          })
          .catch(next);
})

// DELETE campuses/:campusId
router.delete('/:id',(req,res,next)=>{
  Campuses.destroy({where: {id:req.id}})
    .then(() => res.status(204).end())
    .catch(next);
})

module.exports = router;
