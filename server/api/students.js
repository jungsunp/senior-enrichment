const router = require('express').Router();
const { Campus, Student } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Student.findAll({
    order: ['id'],
    include: [Campus],
  })
    .then(students => res.status(200).send(students))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.status(200).send(student))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Student.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(students => {
      let campusPromise = Campus.findById(req.body.campusId);
      return [campusPromise, students[0]];
    })
    .spread((campus, student) => {
      let addStudentPromise = campus.addStudent(student);
      return [addStudentPromise, student];
    })
    .spread((campus, student)  => res.status(201).send(student))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => req.res.status(202).send(student))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

