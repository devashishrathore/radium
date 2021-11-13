const { query } = require('express');
const express = require('express');

const router = express.Router();

    let movieArr = [{
         'id': 1,
         'name': 'The Shining',
         'rating':6,
         'director': 'Stanley Kubrik',
         'genre': 'horror'
}, {
    'id': 2,
    'name': 'Baghi',
    'rating':7,
    'director': 'Sabbir Khan',
    'genre': 'Action'
}, {
    'id': 3,
    'name': 'Commando',
    'rating':8,
    'director': 'Dilip Ghosh',
    'genre': 'petriotism'
}, {
    'id': 4,
    'name': 'Gabbar is back',
    'rating':9,
    'director': 'Krish Jagarlamudi',
    'genre': 'Drama'
}, {
    'id': 5,
    'name': 'Kabir Singh',
    'rating':10,
    'director': 'VS Reddy',
    'genre': 'Love Story'
}, {
    'id': 6,
    'name': 'Radhe',
    'rating':11,
    'director': 'Prabhu Deva',
    'genre': 'Action Adventure '
}, {
    'id': 7,
    'name': 'Dream Girl',
    'rating':12,
    'director': 'Raaj Shaandilyaa',
    'genre': 'Comedy'
}, {
    'id': 8,
    'name': 'Dhamaal',
    'rating':13,
    'director': 'Indra Kumar',
    'genre': 'Comedy'
}, {
    'id': 9,
    'name': 'Phir Hera Pheri',
    'rating':15,
    'director': 'Neeraj Vora',
    'genre': 'Comedy'
   }]

   
router.get('/specific-movies', function (req, res){
let value = req.params.index
 
 console.log(req.query.rating)
 console.log(req.query.genre)
 res.send(movieArr)
});

module.exports = router;