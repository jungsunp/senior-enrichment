'use strict';

const Promise = require('bluebird');
const chance = require('chance')(123);
const toonavatar = require('cartoon-avatar');

const db = require('./db');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

// Set up campus data
// TODO: update images
const campuses = [
  { name: 'Carnegie Mellon University',
    image: 'http://msnbcmedia.msn.com/i/MSNBC/Components/Slideshows/_production/_archive/News/_Politics/ss-120224-obama-year4/ss-120713-obama-year4-03.jpg'
  },
  { name: 'University of Illinois',
    image: 'http://msnbcmedia.msn.com/i/MSNBC/Components/Slideshows/_production/_archive/News/_Politics/ss-120224-obama-year4/ss-120713-obama-year4-03.jpg'
  },
  { name: 'Saint Louis Colleg of Pharmacy',
    image: 'http://msnbcmedia.msn.com/i/MSNBC/Components/Slideshows/_production/_archive/News/_Politics/ss-120224-obama-year4/ss-120713-obama-year4-03.jpg'
   },
  { name: 'University of Pittsburgh',
    image: 'http://msnbcmedia.msn.com/i/MSNBC/Components/Slideshows/_production/_archive/News/_Politics/ss-120224-obama-year4/ss-120713-obama-year4-03.jpg'
   },
  { name: 'Purdue University',
    image: 'http://msnbcmedia.msn.com/i/MSNBC/Components/Slideshows/_production/_archive/News/_Politics/ss-120224-obama-year4/ss-120713-obama-year4-03.jpg'
  }
];

const createCampuses = () => {
  return Promise.all(campuses.map(campusData => {
    return Campus.create(campusData);
  }));
};

// Set up student data
const numStudents = 50;
const studentEmails = chance.unique(chance.email, numStudents);  // get 50 unique email addresses

const randomStudent = () => {
  let gender = chance.gender().toLocaleLowerCase();
  return Student.create({
    name: chance.name({ gender }),
    image: toonavatar.generate_avatar({ gender }),
    email: studentEmails.pop(),
  })
    .then(student => {
      let campusId = chance.natural({
        min: 1,
        max: campuses.length
      });
      return [Campus.findById(campusId), student];
    })
    .spread((campus, student) => campus.addStudent(student))
    .catch(err => console.log(err));
};

const createStudents = () => {
  let promiseArr = [];
  for (let i = 0; i < numStudents; i++) {
    promiseArr.push(randomStudent());
  }
  return Promise.all(promiseArr);
};

// Creaeate both campus data and student data
const seed = () => {
  return createCampuses() // need to create campuses first
    .then(() => createStudents())
    .catch(err => console.log(err));
};

console.log('Syncing database campusmanager ...');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database campusmanager ...');
    return seed();
  })
  .catch(err => {
    console.log('Error from seeding!', err);
  })
  .then(() => {
    db.close();
    return null;
  });
