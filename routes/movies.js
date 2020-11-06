const express = require('express');
const {Movie, validate} = require('../Models/movie');
const  {Genre, getGenre} = require('../Models/genre');
const router = express.Router();



router.get('/', async (req,res) =>{

    const movies = await Movie.find();
    res.send(movies);



});

router.post('/', async (req,res) =>{
    const {error} = validate(req.body);

    if(error) return res.status(400).send(error);

    const exists = await Movie.find({title: req.body.title});

    //if(exists) return res.status(404).send('Movie already exists...');

    const result = CreateMovie(req.body.title, req.body.genre);
    res.send(result);

});



async function CreateMovie(title, genre){
    
    console.log('Name: ' + genre);
    const genreFinder = getGenre(genre);


    console.log(genreFinder.id);
    

    
    let movie = new Movie({
        title:title,
        genre:genreFinder.id
    });
    const result = await movie.save();
    console.log(result);
    //return result;
    


}





module.exports = router;


