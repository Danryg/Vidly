const { number } = require('joi');
const mongoose = require('mongoose');
//const {Genre} = require('genre');
const joi = require('joi');



const Movie = mongoose.model('movie', mongoose.Schema({
    title:String,
    genre:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Genre'
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0,
    }
}));

function ValidateMovie(movie){
    const schema ={
        title: joi.string().min(2).max(24).required(),
        genre: joi.required(),

    }
    return joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = ValidateMovie;