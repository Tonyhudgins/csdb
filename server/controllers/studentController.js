const csdb = require('../models/csdbModel');

const studentController = {};

studentController.getBioImages = (req, res, next) =>  {
  csdb.query(
    'SELECT student_id, first_name, last_name, bio_img ' +
    'FROM student ' +
    'WHERE cohort_id = $1',
    [req.body.cohort_id],
    function (err, result) {
      if (err) {
        return res.status(401).send('Fetch failed for bio images');
      } else {
        res.studentData = result.rows;
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
