const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database')
const path   = require('path');
const auth = require('./routers/auth')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could not connect to the database: ', err);
  } else {
    // console.log('Your secrete is "' + config.secrete + '"');
    console.log('Connected to the database: ' + config.db);
  }
});

//Middle_ware    Provide static directory for Front-End
// parse application/x-www-form-urlencoded 

// allowing cross servers
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/'));
app.use('/auth', auth);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
