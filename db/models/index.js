'use strict';

const User = require('./user');
const Student = require('./student');
const Campus = require('./campus');

Campus.hasMany(Student);

Student.belongsToMany(Campus, {through: 'student_campus'});

module.exports = {
	User,
	Student,
	Campus
};
