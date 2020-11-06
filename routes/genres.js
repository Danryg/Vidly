const {Genre, validate} = require('../Models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Get
router.get('/', async (req, res)=>{
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res)=>{

    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("The course with the given id was not found");

    res.send(genre);
    
});
//Post
router.post('/',async (req,res)=>{


    const {error} = validate(req.body);
    
    if(error) return res.status(400).send(error);
    
    let genre = new Genre({ name: req.body.name });
    
    genre = await genre.save();

    res.send(genre);
});
//Remove
router.delete('/:id', async(req,res)=>{

    //Find the genre object
    const genre = await Genre.findByIdAndRemove(req.params.id);
    //throw error 404 if not found
    if(!genre) return res.status(404).send('Error: 404, Genre not found');
   
    //send the object that was deleted
    res.send(genre);
});

//Put
router.put('/:id',async(req,res)=>{

    const {error} = validate(req.body);
    //Throw error if not valid
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true});
    
    //If not found throw 404
    if(!genre) return res.status(404).send('Error: 404, Genre not found');

    res.send(genre);
});

module.exports = router;