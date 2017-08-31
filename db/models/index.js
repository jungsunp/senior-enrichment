'use strict';

const User = require('./user');
const Student = require('./student');
const Campus = require('./campus');

Campus.belongsToMany(Student, {through: 'campus_student'});
Student.belongsToMany(Campus, {through: 'campus_student'});

module.exports = {
	User,
	Student,
	Campus
};
