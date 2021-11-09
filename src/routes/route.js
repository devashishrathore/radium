const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.get('/movies', function (req, res) {
    let movies = ['three idiot', 'breaking', 'fast and furious']
    res.send(movies)
});

router.get('/movies/:movieIndex', function (req, res) {
    //console.log(req)
    let movie = ['three idiot', 'breaking', 'fast and furious']
    let index = req.params.movieIndex
    let movieAtIndex = movie[index]

    let handle = index > movie.length ? "use a valid index" : movieAtIndex
    res.send(handle)
    //index>movie.length?res.send("use a valid index"):res.send(movieAtIndex)
    res.send(handle)
});

router.get('/films', function (req, res) {
    let filmNameID = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Demo'

    }]
    res.send(filmNameID)
})

router.get('/films/:filmId', function (req, res) {
    let filmNameID = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Demo'

    }]

    let value = req.params.filmId
    let film = filmNameID.filter(x => x.id == value)
    res.send(value >= filmNameID.length ? 'not a valid id' : film[0].name)
    
})



/*router.get('/movies/:index', function(req, res){
    //console.log(req)
    let film = ['titanic','zoom','eternals','doom']
    let value = req.params.index
    let watch = film[value]
    res.send(watch)
    //if(index>=film.length){
     //res.send("ERROR")
    //}
    //else{
    //res.send(watch)
    //}
});*/

module.exports = router;