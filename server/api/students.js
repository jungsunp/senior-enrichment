const router = require('express').Router();
/*
Your back end api is looking great. One small sidenote just for the
sake of clarity (and maybe it's just a personal preference), but I like
to name my routers the name of the actual particular router I am using.
So instead of:

const router = require('express'.Router();

I would write:

const students = require('express').Router();

Then I would write:

students.get
students.post
students.put
etc...

It's completely up to you how you write these of course, but I've found
its a little more clear for other people reading through your code rather
than having every single router named 'router'. But whatever works best for you
is totally fine as well. Just a naming convention. But I have found that when
projects start to get bigger, that naming starts to really matter more than you
might think.
*/

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
    /*
    Line 97 above won't be executed. At this point you have already
    sent your response off. Line 95 will resolve the request and does
    not contain another promise that you can chain another .then() off of.
    Also, on line 97, you wrote req.res.status. You can only execute methods
    off res, since that is the response object that contains the methods you
    are trying to use like .status() and .send().
    */
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

