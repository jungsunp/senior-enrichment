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
  {
    name: 'Carnegie Mellon University',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Carnegie_Mellon_University_seal.svg',
    description: 'Carnegie Mellon University is a private research university in Pittsburgh, Pennsylvania. Founded in 1900 by Andrew Carnegie as the Carnegie Technical Schools, the university became the Carnegie Institute of Technology in 1912 and began granting four-year degrees. In 1967, the Carnegie Institute of Technology merged with the Mellon Institute of Industrial Research to form Carnegie Mellon University.'
  },
  {
    name: 'University of Illinois',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/af/University_of_Illinois_seal.svg',
    description: 'The University of Illinois at Urbana-Champaign (also known as U of I, University of Illinois, UIUC {deprecated[7][8]}, or simply Illinois) is a public research university in the U.S. state of Illinois. Founded in 1867 as a land-grant institution in the twin cities of Champaign and Urbana (together known as Champaign-Urbana), it is the flagship campus of the University of Illinois system and a founding member of the Big Ten Conference.'
  },
  {
    name: 'St. Louis College of Pharmacy',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/3b/St_Louis_CoF_logo.png',
    description: 'St. Louis College of Pharmacy (STLCOP) is a private and independent nonsectarian professional university in St. Louis, Missouri. It was founded in 1864. Located on an 9-acre (0.01 sq mi; 3.64 ha) campus in St. Louis Central West End medical community, the St. Louis College of Pharmacy is the oldest college of pharmacy west of the Mississippi River. The College’s 6,941 living alumni represent 50 states and 13 foreign countries. Approximately 75% of practicing pharmacists in the St. Louis region are graduates of St. Louis College of Pharmacy.[3]'
  },
  {
    name: 'University of Pittsburgh',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/University_of_Pittsburgh_seal.svg',
    description: 'The University of Pittsburgh (commonly referred to as Pitt) is a state-related research university located in Pittsburgh, Pennsylvania. In 1787 after the American Revolutionary War, it was founded on the edge of the American frontier as the Pittsburgh Academy. It developed and was renamed as Western University of Pennsylvania by a change to its charter in 1819. After surviving two devastating fires and various relocations within the area, the school moved to its current location in the Oakland neighborhood of the city; it was renamed as the University of Pittsburgh in 1908. For most of its history, Pitt was a private institution, until 1966 when it became part of the Commonwealth System of Higher Education.'
  },
  {
    name: 'Purdue University',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/61/Purdue_University_seal.svg',
    description: 'Purdue University is a public research university located in West Lafayette, Indiana and is the main campus of the Purdue University system.[5] The university was founded in 1869 after Lafayette businessman John Purdue donated land and money to establish a college of science, technology, and agriculture in his name.[6] The first classes were held on September 16, 1874, with six instructors and 39 students.[6]'
  },
  {
    name: 'Harvard University',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/3a/Harvard_Wreath_Logo_1.svg',
    description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts, established in 1636, whose history, influence, and wealth have made it one of the worlds most prestigious universities.[7] Established originally by the Massachusetts legislature and soon thereafter named for John Harvard (its first benefactor), Harvard is the United States oldest institution of higher learning, [8] and the Harvard Corporation (formally, the President and Fellows of Harvard College) is its first chartered corporation. Although never formally affiliated with any denomination, the early College primarily trained Congregational and Unitarian clergy. Its curriculum and student body were gradually secularized during the 18th century, and by the 19th century Harvard had emerged as the central cultural establishment among Boston elites.'
  },
  {
    name: 'Michigan State University',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/53/Michigan_State_University_seal.svg',
    description: 'Michigan State University (MSU) is a public research university in East Lansing, Michigan, United States. MSU was founded in 1855 and served as a model for land-grant universities later created under the Morrill Act of 1862.[4] The university was founded as the Agricultural College of the State of Michigan, one of the countrys first institutions of higher education to teach scientific agriculture.[5] After the introduction of the Morrill Act, the college became coeducational and expanded its curriculum beyond agriculture. Today, MSU is one of the largest universities in the United States (in terms of enrollment) and has approximately 552,000 living alumni worldwide.'
  },
  {
    name: 'Boston University',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Boston_University_seal.svg',
    description: 'Boston University (commonly referred to as BU) is a private research university located in Boston, Massachusetts. The university is nonsectarian,[7] and is historically affiliated with the United Methodist Church.[8][9] The university has more than 3,900 faculty members and nearly 33,000 students, and is one of Bostons largest employers.[10] It offers bachelors degrees, masters degrees, and doctorates, and medical, dental, business, and law degrees through 17 schools and colleges on two urban campuses. The main campus is situated along the Charles River in Bostons Fenway-Kenmore and Allston neighborhoods, while the Boston University Medical Campus is in Bostons South End neighborhood.'
  },
  {
    name: 'Boston College',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Boston_College_Seal.svg',
    description: 'Boston College (also referred to as BC) is a private Jesuit Catholic research university located in the affluent village of Chestnut Hill, Massachusetts, United States, 6 miles (9.7 km) west of downtown Boston. It has 9,100 full-time undergraduates and almost 5,000 graduate students. The universitys name reflects its early history as a liberal arts college and preparatory school (now Boston College High School) in Bostons South End. It is a member of the 568 Group and the Association of Jesuit Colleges and Universities. Its main campus is a historic district and features some of the earliest examples of collegiate gothic architecture in North America.'
  },
];

const createCampuses = () => {
  return Promise.all(campuses.map(campusData => {
    return Campus.create(campusData);
  }));
};

// Set up student data
const numStudents = 50;
const studentEmails = chance.unique(chance.email, numStudents);  // get 50 unique email addresses
const studentPhones = chance.unique(chance.phone, numStudents);  // get 50 unique email addresses

const randomStudent = () => {
  let gender = chance.gender().toLocaleLowerCase();
  return Student.create({
    name: chance.name({ gender }),
    image: toonavatar.generate_avatar({ gender }),
    email: studentEmails.pop(),
    phone: studentPhones.pop(),
    birthday: chance.birthday({string: true})
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
