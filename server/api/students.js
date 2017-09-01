const router = require('express').Router();
const { Campus, Student } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Student.findAll({
    order: [
      ['id', 'DESC']
    ],
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
        image: req.body.image,
        email: req.body.email,
        birthday: req.body.birthday,
        phone: req.body.phone,
      }
    })
    .then(students => {
      let campusPromise = Campus.findById(req.body.campusId);
      return [campusPromise, students[0]];
    })
    .spread((campus, student) => {
      let addStudentPromise = campus.addStudent(student);
      return [addStudentPromise, campus, student];
    })
    .spread((relation, campus, student)  => {
      res.status(201).send({ campus, student });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update({
      name: req.body.name,
      email: req.body.email,
      birthday: req.body.birthday,
      phone: req.body.phone,
    }))
    .then(student => {
      let clearPromise = student.setCampuses(null);
      return [clearPromise, student];
    })
    .spread((relation, student) => {
      let campusPromise = Campus.findById(req.body.campusId);
      return [campusPromise, student];
    })
    .spread((campus, student) => {
      let addStudentPromise = campus.addStudent(student);
      return [addStudentPromise, campus, student];
    })
    .spread((relation, campus, student)  => {
      res.status(201).send({ campus, student });
    })
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

