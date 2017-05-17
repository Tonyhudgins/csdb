const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const studentController = require('./controllers/studentController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './../')));

app.get('/', (request, response) => {
  console.log('in /');
  response.status(200).sendFile(path.resolve('../index.html'));
});

app.get('/bioImg', studentController.getUsers);

app.post('/bioImg', studentController.addUser);

app.listen(3000);

module.exports = app;
