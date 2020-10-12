const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const app = express(); 
 
// DB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => { console.log('MongoDB connected!') })
.catch((err) => { console.log(err) });

//view engine 
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

   
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/cars'));


//PORT settings
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`PORT ${PORT} is running...`);
});