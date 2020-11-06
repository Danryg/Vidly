const startuppDebugger = require('debug')('app:startupp');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const home = require('./routes/home');

const app = express();
const port = process.env.PORT = 3000;
console.log(app.get('env'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startuppDebugger('Morgan enabled...');
}

//Db work
mongoose.connect('mongodb://localhost/Vidly', {useNewUrlParser: true})
.then(console.log('Connected to database....'))
.catch(err=>console.log('Error connecting to database....  ', err));


app.set('view engine', 'pug');
app.use(express.json());
app.use(helmet());
app.use(logger);
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);


//Configuration
// console.log("Application Name"+config.get('name'));
// console.log("Mail Server"+config.get('mail.host'));
// console.log("Mail password"+config.get('mail.password'));

app.listen(port, () => console.log(`Listening to port: ${port}.....`));