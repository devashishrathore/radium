const express = require('express');

const router = express.Router();
//Devashish Rathore Radium A+

// W3-d2-Tuesday-9nov2021 Sabiha mam (5 question)
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

/* Problem-1
Create an endpoint for GET /movies that returns a list of 
movies.Define an array of movies in your code and return 
the value in response.
*/
router.get('/movies', function (req, res) {
    let movies = ['three idiot', 'breaking', 'fast and furious']
    res.send(movies)
});

/* Problem-2
Create an endpoint GET movies/indexNumber (For example GET /movies/1
is a valid request and it should return the movie in your array 
at index 1). You can define an array of movies again in your api.
*/
router.get('/movies/:movieIndex', function (req, res) {
    //console.log(req)
    let movie = ['three idiot', 'breaking', 'fast and furious']
    let index = req.params.movieIndex
    let movieIndex = movie[index]
    res.send(movieIndex)
});
/* Problem-3
Handle a scenario in problem 2 where if the index is greater 
than the valid maximum value a message is returned that tells 
the user to use a valid index in an error message.
*/
router.get('/movies/:movieIndex', function (req, res) {
    //console.log(req)
    let movie = ['three idiot', 'breaking', 'fast and furious']
    let index = req.params.movieIndex
    let movieIndex = movie[index]

    let handle = index > movie.length ? "use a valid index" : movieAtIndex
    res.send(handle)
    //index>movie.length?res.send("use a valid index"):res.send(movieAtIndex)
    res.send(handle)
});

/* Problem-4
Write another api called GET /films. Instead of an array of 
strings define an array of movie objects this time. Each movie 
object should have values - id, name. An example 
of movies array is 
[ {
 “id”: 1,
 “name”: “The Shining”
}, {
 “id”: 2,
 “name”: “Incendies”
}, {
 “id”: 3,
 “name”: “Rang de Basanti”
}, {
 “id”: 4,
 “name”: “Finding Demo”
}]

Return the entire array in this api’s response
*/
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
});

/* Problem-5
Write api GET /films/:filmId where filmId is the value received 
in request path params. Use this value to return a movie object 
with this id. In case there is no such movie present in the 
array, return a suitable message in the response body. 
Example for a request GET /films/2 should return the 
movie object {
 “id”: 3,
 “name”: “Rang de Basanti”
}
*/
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

});
//W3-d3-Wednesday-10november2021 (Test) 

//W3-d4-Thursday-11november-2Short+2Long Assignment, Pritesh Sir

/* Short Problem-1 
write an api which gives the missing number in an 
array of integers starting from 1 
EX. [1,2,3,5,6,7] : 4 is missing
*/
router.get("/miss-num", function (req, res) {
    let number = [1, 2, 3, 5, 6, 7]
    let x = 0

    for (let i = 0; i < number.length; i++) {
        x = x + number[i];
    }
    let n = Math.max(...number)
    let sumNew = n * (n + 1) / 2
    let missNumber = sumNew - x

    res.send({ data: missNumber })
})

/* Short Problem-2
write an api which gives the missing number in an 
array of integers starting from anywhere….
EX. [33, 34, 35, 37, 39] : 36 is missing
*/
router.get('/random-miss', function (req, res) {
    let number = [33, 34, 35, 37, 38]

    givenNumSum = 0
    for (let i = 0; i < number.length; i++) {
        givenNumSum = givenNumSum + number[i]
    }
    let lastDigit = Math.max(...number)
    let firstDigit = Math.min(...number)

    let add = firstDigit + lastDigit
    let consNum = (number.length + 1) * (add) / 2

    let missingNumber = consNum - givenNumSum

    res.send({ MissNo: missingNumber })
});

//W3-d5-Friday-12nov2021 Sabiha Mam, Assignment (4-Question)

let movieArr = [{
    'id': 1,
    'name': 'The Shining',
    'rating': 6,
    'director': 'Stanley Kubrik',
    'genre': 'horror'
}, {
    'id': 2,
    'name': 'Baghi',
    'rating': 7,
    'director': 'Sabbir Khan',
    'genre': 'Action'
}, {
    'id': 3,
    'name': 'Commando',
    'rating': 8,
    'director': 'Dilip Ghosh',
    'genre': 'petriotism'
}, {
    'id': 4,
    'name': 'Gabbar is back',
    'rating': 9,
    'director': 'Krish Jagarlamudi',
    'genre': 'Drama'
}, {
    'id': 5,
    'name': 'Kabir Singh',
    'rating': 10,
    'director': 'VS Reddy',
    'genre': 'Love Story'
}, {
    'id': 6,
    'name': 'Radhe',
    'rating': 11,
    'director': 'Prabhu Deva',
    'genre': 'Action Adventure '
}, {
    'id': 7,
    'name': 'Dream Girl',
    'rating': 12,
    'director': 'Raaj Shaandilyaa',
    'genre': 'Comedy'
}, {
    'id': 8,
    'name': 'Dhamaal',
    'rating': 13,
    'director': 'Indra Kumar',
    'genre': 'Comedy'
}, {
    'id': 9,
    'name': 'Phir Hera Pheri',
    'rating': 15,
    'director': 'Neeraj Vora',
    'genre': 'Comedy'
}]

/* Prpblem-1
Write a GET api to fetch specific movies (path -> /specific-movies) 
with the help of query params - rating and genre
You have to return only those movies in the response that have the 
rating and genre received in query parameters in the request and if there is 
no match with genre & rating than return "movie is not available for this filter"
*/

router.get("/specific-movies", function (req, res) {
    let requestRating = req.query.rating;
    let requestGenre = req.query.genre;
    let requestMovie;

    for (let i = 0; i < movieArr.length; i++) {
        if (
            movieArr[i].rating == requestRating &&
            movieArr[i].genre == requestGenre
        ) {
            requestMovie = movieArr[i];
            break;
        }

    }
    if (requestMovie) {
        res.send(
            "The movies request with genre: " +
            requestGenre +
            " and rating: " +
            requestRating +
            " - " +
            requestMovie.name
        );
    } else {
        res.send(
            "Movies for this filter is not available (rating: " +
            requestRating +
            ", genre: " +
            requestGenre +
            " ) is not available "
        );
    }
});

/* Problem-2
Write a POST api to add a movie to the movies collection 
(path -> /specific-movies ). You have to make sure you provide
all the details of the movie in the request at Postman 
(movie details must have an id, name, rating, director and genre) 
as well as that you return the updated array in the response.*/

router.post("/specific-movies", function (req, res) {
    let newMovies = {
        id: req.body.id,
        name: req.body.name,
        rating: req.body.rating,
        director: req.body.director,
        genre: req.body.genre,
    };
    movieArr.push(newMovies)
    res.send(movieArr)
});

/*Problem-3 
Write a GET api (path -> /best-movie) that returns only 
one movie that has the highest rating in the collection.
In case there are multiple movies with the highest 
rating value, return any one out of those.*/

router.get("/best-movie", function (req, res) {
    let highestRating = 0;
    let highestRatingIndex = 0;
    for (let i = 0; i < movieArr.length; i++) {
        highestRating = movieArr[i].rating;
        highestRatingIndex = i;
    }
    res.send("Highest rating movies in the list is " + movieArr[highestRatingIndex].name);
});

/* Problem 4
For this problem you don’t have to write a new api you 
have to update the logic in problem 2’s api. This time you 
must check the value of rating as well the value of director 
in the request. If the rating has value greater than 10, 
return a message in the response informing that the maximum 
value a rating can have is 10. If the director value is not 
present in the request you have to return a message in the 
response informing the director value must be present. 
In case both the problems exist for example the data looks 
like below (invalid rating and no director value present), 
you have to return the error for the director value
 {
 “id”: 1,
 “name”: ‘The Shining’,
 “rating”:11,
 “genre”: “horror”
 }
*/

router.post("/specific-movies", function (req, res) {
    let rating = req.body.rating;
    let director = req.body.director;
    console.log(director)
    if (!director) {
        res.send("Director information must be present in the request");
    } else if (rating < 10) {
        res.send("Rating is not valid. A valid rating value is between 1 and 10");
    } else {
        let newMovies = {
            id: req.body.id,
            name: req.body.name,
            rating: req.body.rating,
            director: req.body.director,
            genre: req.body.genre,
        };
        movieArr.push(newMovies)
        res.send(movieArr)
    }
});
module.exports = router;