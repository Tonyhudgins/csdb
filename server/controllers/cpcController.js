const csdb = require('../models/csdbModel');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const cpcController = {};

/**
 * buildSQL
 * @summary Allows dynamic criteria (currently only on '=' later we'll implement other operators
 * To create a requests with WHERE statements, send something like:
 * {
 *    where: {
 *      "cohort_id" : "1",
 *      "student_id" : "100000",
 *    }
 * }
 * @params query
 * @params where
 */
const buildSQL = (query, where, ...values) => {
  const result = {
    queryString: query,
    values: [...values],
  };
  const operators = {
    eq: ' = ',
    ne: ' <> ',
    gt: ' > ',
    gte: ' >= ',
    lt:  ' < ',
    lte: ' <= ',
    like: ' LIKE ',
  };

  //console.log('in BuildSQL');
  //console.log(result);
  //console.log(where);

  if (where && typeof where === 'object') {
    result.queryString += where ? ' where' : '';

    Object.keys(where).forEach(function(operator) {
      //console.log('operator', operator);
      Object.keys(where[operator]).forEach(function (criteria) {
        const value = where[operator][criteria];
        //console.log('criteria', criteria);
        //console.log('value', value);
        result.queryString += ` ${criteria} ${operators[operator]} $${result.values.length + 1} and`;
        result.values.push(value);
      });
    });

    result.queryString = result.queryString.replace(/and$/, '');
  }

  //console.log('SCHNO >> ', result);

  return result;
};

const buildUpdate = (query, data, where) => {
  //console.log('in buildUpdate');
  const result = {
    queryString: query,
    values: [],
  };

  //console.log('query', query);
  //console.log('data', data);
  //console.log('where', where);

  if (data && typeof data === 'object') {
    Object.keys(data).forEach(function (field) {
      if (data[field] !== null) {
        result.values.push(data[field]);
        result.queryString += ` ${field} = ($${result.values.length}),`;
      }
    });

    result.queryString = result.queryString.replace(/\,$/, '');
  }

  return buildSQL(result.queryString, where, ...result.values);

};

const buildInsert = (query, data) => {
  const result = {
    queryString: query,
    valuesString: ') VALUES (',
    values: [],
  };

  if (data && typeof data === 'object') {
    result.queryString += '(';
    Object.keys(data).forEach(function (field) {
      if (data[field] !== null) {
        result.queryString += ` ${field},`;
        result.values.push(data[field]);
        result.valuesString += `$${result.values.length},`;
      }
    });

    result.queryString = result.queryString.replace(/\,$/, '');
    result.valuesString = result.valuesString.replace(/\,$/, ')');
    result.queryString = result.queryString.concat(result.valuesString);
    console.log(`SCHNO ${result.querystring}`);
  } else {
    console.error(`buildInsert passed invalid data:${data}`);
  }

  return result;

};

cpcController.getBioImages = (req, res, next) =>  {

  const sql = buildSQL('SELECT student_id, first_name, last_name, bio_img FROM student', req.body.where);

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send('Fetch failed for bio images');
      } else {
        res.studentData = result.rows;
        next();
      }
    });
};

cpcController.getCampuses = (req, res, next) => {

  const sql = buildSQL('SELECT * from campus', req.body.where);

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send('Fetch failed for campus list');
      } else {
        res.campusList = result.rows;
        next();
      }
    });
};

cpcController.getPrograms = (req, res, next) => {

  const sql = buildSQL('SELECT * from program', req.body.where);

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send({error: err});
      } else {
        res.programList = result.rows;
        next();
      }
    });
};

cpcController.getCohorts = (req, res, next) => {

  const sql = buildSQL('SELECT * from cohort', req.body.where);

  csdb.query(
    sql.queryString + ' order by cohort_name',
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send({error: err});
      } else {
        res.cohortList = result.rows;
        next();
      }
    });
};

cpcController.getStudents = (req, res, next) => {

  const sql = buildSQL('SELECT * from student', req.body.where);
  sql.queryString += ' order by first_name';

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send({error: err});
      } else {
        // console.log(result.rows);
        res.studentList = result.rows;
        next();
      }
    });
};

cpcController.createStudent = (req, res, next) =>  {

  const sql = buildInsert('INSERT INTO student', req.body.data);
  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send(err);
      } else {
        console.log('insert success', result);
        next();
      }
    });
};

cpcController.updateStudent = (req, res, next) => {
    console.log('in updateStudent');
    console.log(req.body);
    console.log(req.body.where);
    const sql = buildUpdate('UPDATE student set', req.body.data, req.body.where, req.body.whereNe);

    console.log(sql);

    csdb.query(
      sql.queryString,
      [...sql.values],
      function (err, result) {
        if (err) {
          console.error(err);
          return res.status(400).send(err);
        } else {
          console.log('update success', result);
          next();
        }
      });
};

cpcController.updateImage = (req, res, next) => {
  console.log('in updateImage');
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if(err) {
      console.error(err);
      return res.status(400).send(err);
    } else {
      // update the database
      const sql = buildUpdate('UPDATE student set',
          {[fields.image_type]: fields.name},
          { eq: {'student_id': fields.student_id}});

      csdb.query(
        sql.queryString,
        [...sql.values],
        function (err, result) {
          if (err) {
            console.error(err);
            return res.status(400).send(err);
          } else {
            const source = files.image.path;
            // create the cohort directory if it doesn't already exist
            const targetDir = path.join(__dirname, '../../client/assets/images/' + fields.cohort_id);
            if(!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
            const dest = path.join( targetDir + '/' + fields.name);
            console.log('fields', fields);
            console.log('dest', dest);
            fs.rename(source, dest, (err) => {
              if (err) throw err;
              console.log(`successfully moved ${source} to ${dest}`);
              next();
            });
          }
        });
      }
    });
};

cpcController.bulkStudentsUpload = (req, res, next) => {
  console.log('in bulkStudentsUpload');
  console.log(req.body);

  if(req.body.cohort_id && req.body.data.length) {
    req.body.data.forEach((student => {
      student.cohort_id = req.body.cohort_id;
      const sql = buildInsert('INSERT INTO student', student);
      console.log(sql);
      csdb.query(
        sql.queryString,
        [...sql.values],
        function (err, result) {
          if (err) {
            console.error(err);
            return res.status(400).send({ error: err });
          }
        });
      next();
    }));
  } else {
    return res.status(400).send({ error: 'No cohort_id provided' });
  }
};

cpcController.createCohort = (req, res, next) =>  {

  const sql = buildInsert('INSERT INTO cohort', req.body.data);
  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send({ error: err});
      } else {
        console.log('insert success', result);
        next();
      }
    });
};

cpcController.updateCohort = (req, res, next) => {
  console.log('in updateCohort');
  console.log(req.body);
  console.log(req.body.where);
  const sql = buildUpdate('UPDATE cohort set', req.body.data, req.body.where);

  console.log(sql);

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send(err);
      } else {
        console.log('update success', result);
        next();
      }
    });
};

cpcController.createProgram = (req, res, next) =>  {

  const sql = buildInsert('INSERT INTO program', req.body.data);
  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send({ error: err});
      } else {
        console.log('insert success', result);
        next();
      }
    });
};

cpcController.updateProgram = (req, res, next) => {
  console.log('in updateProgram');
  console.log(req.body);
  console.log(req.body.where);
  const sql = buildUpdate('UPDATE program set', req.body.data, req.body.where);

  console.log(sql);

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send(err);
      } else {
        console.log('update success', result);
        next();
      }
    });
};

cpcController.createCampus = (req, res, next) =>  {

  const sql = buildInsert('INSERT INTO campus', req.body.data);
  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send({ error: err});
      } else {
        console.log('insert success', result);
        next();
      }
    });
};

cpcController.updateCampus = (req, res, next) => {
  console.log('in updateCampus');
  console.log(req.body);
  console.log(req.body.where);
  const sql = buildUpdate('UPDATE campus set', req.body.data, req.body.where);

  console.log(sql);

  csdb.query(
    sql.queryString,
    [...sql.values],
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).send(err);
      } else {
        console.log('update success', result);
        next();
      }
    });
};

module.exports = cpcController;

