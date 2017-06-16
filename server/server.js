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

app.post('/createStudent',
  studentController.createStudent,
  (req, res) => {
    res.status(200).send('success!');
  }
);

app.get('/campusList',
  studentController.getCampuses,
  (req, res) => {
    res.status(200).json(res.campusList);
  }
);

app.post('/programList',
  studentController.getPrograms,
  (req, res) => {
    res.status(200).json(res.programList);
  }
);

app.post('/cohortList',
  studentController.getCohorts,
  (req, res) => {
    res.status(200).json(res.cohortList);
  }
);

app.post('/studentList',
  studentController.getStudents,
  (req, res) => {
    res.status(200).json(res.studentList);
  }
);

app.post('/updateStudent',
  studentController.updateStudent,
  (req, res) => {
    res.status(200).send('success!');
  }
);

app.get('*', (req, res) => res.redirect('http://localhost:8080/'));

console.log(new Date() + ' server listening on port 8080');

app.listen(8080);

module.exports = app;
