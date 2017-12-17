const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cpcController = require('./controllers/cpcController');

const app = express();

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const webpackConfig = require('../webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));

    app.use(webpackHotMiddleware(compiler));
}
/* eslint-enable */


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '../client/assets/images')));
app.use(express.static(path.join(__dirname, '../dist/')));


app.get('/',
  (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
  }
);

app.post('/bioImg',
    cpcController.getBioImages,
    (req, res) => {
        res.status(200).json(res.studentData);
    }
);

app.get('/campusList',
    cpcController.getCampuses,
    (req, res) => {
        res.status(200).json(res.campusList);
    }
);

app.post('/programList',
    cpcController.getPrograms,
    (req, res) => {
        res.status(200).json(res.programList);
    }
);

app.post('/cohortList',
    cpcController.getCohorts,
    (req, res) => {
        res.status(200).json(res.cohortList);
    }
);

app.post('/studentList',
    cpcController.getStudents,
    (req, res) => {
        res.status(200).json(res.studentList);
    }
);

app.post('/createStudent',
    cpcController.createStudent,
    (req, res) => {
        res.status(200).send({ "message": "Student created" });
    }
);

app.post('/updateStudent',
    cpcController.updateStudent,
    (req, res) => {
        res.status(200).send({ "message": "Student updated" });
    }
);

app.post('/imageUpload',
    cpcController.updateImage,
    (req, res) => {
        res.status(200).send({ "message": "Image updated" });
    }
);

app.post('/bulkStudentsUpload',
    cpcController.bulkStudentsUpload,
    (req, res) => {
        res.status(200).send({ "message": "Bulk Update Complete" });
    }
);

app.post('/createCohort',
    cpcController.createCohort,
    (req, res) => {
        res.status(200).send({ "message": "Cohort created" });
    }
);

app.post('/updateCohort',
    cpcController.updateCohort,
    (req, res) => {
        res.status(200).send({ "message": "Cohort updated" });
    }
);

app.post('/createProgram',
    cpcController.createProgram,
    (req, res) => {
        res.status(200).send({ "message": "Program created" });
    }
);

app.post('/updateProgram',
    cpcController.updateProgram,
    (req, res) => {
        res.status(200).send({ "message": "Program updated" });
    }
);

app.post('/createCampus',
    cpcController.createCampus,
    (req, res) => {
        res.status(200).send({ "message": "Campus created" });
    }
);

app.post('/updateCampus',
    cpcController.updateCampus,
    (req, res) => {
        res.status(200).send({ "message": "Campus updated" });
    }
);

app.get('*', (req, res) => res.redirect('http://localhost:8085/'));

console.log(new Date() + ' server listening on port 8085');

app.listen(8085);

module.exports = app;