const pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'klazzmgh', //env var: PGUSER
  database: 'klazzmgh', //env var: PGDATABASE
  password: '2JAVSPQ4X0RpZ_XAyClXhbQwEmSy5Vf4', //env var: PGPASSWORD
  host: 'stampy.db.elephantsql.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};















//const Sequelize = require('sequelize');
//const bcrypt = require('bcryptjs');

/*const User = connection.define('users', {
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
});*/

//User.sync();
// .then(() => {
//   User.create({
//     first_name: 'Rodrigo',
//     last_name: 'Leme',
//     password: 'pig',
//   });
// });

/*const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://klazzmgh:2JAVSPQ4X0RpZ_XAyClXhbQwEmSy5Vf4@stampy.db.elephantsql.com:5432/klazzmgh';

const client = new pg.Client(connectionString);
client.connect();

module.exports = User;*/


