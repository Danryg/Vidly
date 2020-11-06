
const {Customer, validate} = require('../Models/customer');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
router.get('/', async (req,res) =>{

    const customers = await Customer.find();
    res.send(customers);
    

});

router.get('/:id', async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
});

router.post('/', async(req,res)=>{

    const {error} = validate(req.body);

    if(error) return res.status(400).send(error);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);


});

router.delete('/:id', async(req,res)=>{
    const customer = Customer.findByIdAndDelete()
})

module.exports = router;