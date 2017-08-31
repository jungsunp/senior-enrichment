const router = require('express').Router();
const { Campus, Student } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Campus.findAll({
    include: [Student],  // eager loading
    order: ['id']
  })
    .then(campuses => res.status(200).send(campuses))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Campus.findById(req.params.id, {
    include: [Student],  // eager loading
  })
    .then(campus => res.status(200).send(campus))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.status(201).send(campus))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.update(req.body))
    .then(campus => res.status(202).send(campus))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Campus.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

