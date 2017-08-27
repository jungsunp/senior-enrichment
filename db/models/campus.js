const Sequelize = require('sequelize');
const db = require('../index');

// TOBE FIXED
const images = [
  'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584',
  'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
  'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
  'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'
];

// TOBE FIXED
const getImage = () => images[Math.floor(Math.random() * images.length)];

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: () => {
      return getImage();
    }
  }
});
