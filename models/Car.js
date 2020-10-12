const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3
    },
    brand: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
        max: 1000000,
        minlength: 1000
    },
    year: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3
    }
});


const Car = mongoose.model('Cars', carSchema);


module.exports = Car;