const csdb = require('../models/csdbModel');

const studentController = {};

studentController.getBioImages = (req, res, next) =>  {
  csdb.query(
    'SELECT student_id, first_name, last_name, bio_img ' +
    'FROM student ' +
    'WHERE cohort_id = $1',
    [req.body.cohortId],
    function (err, result) {
      if (err) {
        return res.status(401).send('Fetch failed for bio images');
      } else {
        res.studentData = result.rows;
        next();
      }
    });
};

studentController.getCampusList = (req, res, next) => {
  csdb.query(
    'SELECT * from campus',
    [],
    function (err, result) {
      if (err) {
        return res.status(401).send('Fetch failed for campus list');
      } else {
        res.campusList = result.rows;
        next();
      }
    });
};

studentController.getProgramList = (req, res, next) => {
  console.log('req.body.campusId', req.body);
  csdb.query(
    'SELECT * from program where campus_id = $1',
    [req.body.campusId],
    function (err, result) {
      if (err) {
        return res.status(401).send('Fetch failed for program list');
      } else {
        res.programList = result.rows;
        next();
      }
    });
};

studentController.getCohortList = (req, res, next) => {
  csdb.query(
    'SELECT * from cohort where program_id = $1',
    [req.body.programId],
    function (err, result) {
      if (err) {
        return res.status(401).send('Fetch failed for cohort list');
      } else {
        res.cohortList = result.rows;
        next();
      }
    });
};

studentController.addStudent = (req, res, next) =>  {
  csdb.query(
    'INSERT INTO student(first_name, last_name, bio_img, cohort_id)' +
    ' values($1, $2, $3, $4)',
    [req.params.first_name, req.params.last_name, req.params.bio_img, req.params.cohort_id]);
  next();
};

module.exports = studentController;

