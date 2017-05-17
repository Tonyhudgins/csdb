const Sequelize = require('sequelize');
const connection = require('../pgConnection');
const bcrypt = require('bcryptjs');

const User = connection.define('users', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bio_img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    afterValidate: (user) => {
      user.password = bcrypt.hashSync(user.password, 8);
    },
  },
});

//User.sync();
// .then(() => {
//   User.create({
//     first_name: 'Rodrigo',
//     last_name: 'Leme',
//     password: 'pig',
//   });
// });

module.exports = User;
