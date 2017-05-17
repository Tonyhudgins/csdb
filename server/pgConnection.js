const Sequelize = require('sequelize');

const connection = new Sequelize('postgres://smozingo:xxxxxx@localhost:5432/csdb');

connection
  .authenticate()
  .then(err => {
    console.log(`Connection to ${connection.config.database} has been established successfully.`);
  })
  .catch(err => {
    console.error(`Unable to connect to the ${connection.config.database} database: ${err}`);
  });

module.exports = connection;
