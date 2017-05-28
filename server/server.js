const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const studentController = require('./controllers/studentController');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../')));

app.post('/bioImg',
  studentController.getBioImages,
  (req, res) => {
    res.status(200).json(res.studentData);
  }
);

app.post('/addStudent',
  studentController.addStudent,
  (req, res) => {
    res.status(200).send('success!');
  }
);

console.log(new Date() + ' server listening on port 8080');

app.listen(8080);

module.exports = app;
