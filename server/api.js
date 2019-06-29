'use strict'
const api = require('express').Router();
const db = require('../db');
const models=require('../db/models');
const Movies=models.Movie;

// samples e.g. /api/hello
api.get('/hello', (req, res) => res.send({hello: 'world'}));
api.get('/test', (req, res) => res.send('test api'));

// OMDB
api.get('/movies', (req, res, next) => {
	Movies.findAll({ order: [['id', 'DESC']] })
	.then(function(movies) {
		res.json(movies);
	})
	.catch(next);
});

// ADD MOVIE
api.post('/movies/new', (req, res, next) => {
	const title=req.body.Title,
		poster=req.body.Poster,
		year=req.body.Year,
		plot=req.body.Plot,
		imdbID=req.body.imdbID;

	Movies.findAll({ where: {imdbID: imdbID} })
	.then(function (data) {
		if(data.length){
			res.send(data[0].dataValues);
		}else{
			Movies.create({
				title: title,
				poster: poster,
				year: year,
				plot: plot,
				imdbID: imdbID
			})
			.then(function (data) {
				res.json(data.dataValues);
			})
			.catch(next);
		}
	});
});

// EDIT MOVIE
api.put('/movies/edit/', (req, res, next) => {
	const imdbID=req.body.imdbID,
		rating=req.body.rating+"", //toString() would not work
		comment=req.body.comment;

	Movies.update({
		rating: rating,
		comment: comment
	}, {
		where: {imdbID: imdbID}
	})
	.then(function (data) {
		res.send(data);
	})
	.catch(next);
});

// DELETE MOVIE
api.delete('/movies/delete/:movieId', (req, res, next) => {
	var movieId=req.params.movieId, //can use either/or
        movideIdBody=req.body.id;

    console.log('delete api', movieId, movideIdBody);

    Movies.destroy({ where: { imdbID: movieId } })
    .then(function (data) {
		res.send(data);
	})
	.catch(next);
	
    // Movies.findAll({ where: {imdbID: movieId} })
	// .then(function (data) {
	// 	if (data) {
	// 		res.status(204);
	// 		data.destroy({force: true})
	// 		.then(function (data) {
	// 			res.send(data);
	// 		});
	// 	}
	// 	else {
	// 		res.sendStatus(404);
	// 	}
	// });
});

module.exports = api;