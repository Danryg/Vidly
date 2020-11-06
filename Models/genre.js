const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model ('Genre', mongoose.Schema({
    name: {
        type:String,
        maxlength:50,
        minlength:2,
        require:true,
        lowercase:true
    }
}));

const genre = new Genre();

function getGenre(name){
    return Genre.find({name:name});
}

function validateGenre(genre){
    const schema ={
        name: Joi.string().min(2).required()
    }
    return Joi.validate(genre,schema);
}
exports.getGenre = getGenre;
exports.Genre = Genre;
exports.validate = validateGenre;