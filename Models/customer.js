const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold:{
        type:Boolean,
        default: false
    },
    name: {
        type:String,
        require:true
    },
    phone:{
        type:String,
        default:null
    }


}));

function validateCustomer(Customer){

    const schema ={
        
        name: joi.string().min(2).max(50).required(),
        phone: joi.string().min(2).max(50).required(),
        isGold:joi.boolean()
    }

    return joi.validate(Customer, schema);

}

module.exports.Customer = Customer;
exports.validate = validateCustomer;