const express = require('express');
const Car = require('../models/Car');

const router = express.Router();
 
router.get('/cars', async (req, res) => {
    const cars = await Car.find().sort({ name: 1 });
    res.render('cars', {
        posts: cars
    });

    if (!cars)
        return res.status(404).send('Not found!');
});


router.get('/create', (req, res) => {
    res.render('create');
}); 

router.post('/create', async (req, res) => {
        const checkCar = await Car.find({ 
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price, 
            year: req.body.year,
            country: req.body.country
         });

        if (checkCar.length > 0)
            return res.status(400).render('create', {
                errorCheck: 'Already exist!'
            });
    
    const car = new Car({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price, 
        year: req.body.year,
        country: req.body.country
    });
    
    try {
        await car.save();
        res.redirect('/cars')
    } catch (error) {
        console.log(error)
    }
});

router.post('/cars', async (req, res) => {
    await Car.findByIdAndUpdate(req.body.carId, {
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        year: req.body.year,
        country: req.body.country 
    }, {new: true}, (err, res) => {
       if (err) 
           console.log(err);
     
    });

    res.redirect('/cars');
});


router.post('/delcar', async (req, res) => {
    await Car.findByIdAndDelete(req.body.delId, (err, res) => {
        if (err)
            return console.log(err);
    })

    res.redirect('/cars');
});

module.exports = router;