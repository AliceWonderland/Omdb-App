'use strict'
const api = require('express').Router();
const db = require('../db');
const models=require('../db/models');
const Students=models.Student;
const Campuses=models.Campus;
const Movies=models.Movie;

// samples e.g. /api/hello
api.get('/hello', (req, res) => res.send({hello: 'world'}));
api.get('/test', (req, res) => res.send('test api'));

// OMDB
api.get('/search/omdb/:string', (req, res, next) => {
	const searchString=req.params.string;
	console.log(searchString);
	Movies.findAll({ order: [['id', 'DESC']] })
	.then(function(movies) {
		// console.log(JSON.stringify(movies));
		res.json(movies);
	})
	.catch(next);

	// Students.findAll({})
	// .then(students => res.json(students))
	// .catch(next);

});

api.get('/get/omdb/:imdbID', (req, res, next) => {
	const imdbID=req.params.imdbID;
	Movies.findAll({ order: [['id', 'DESC']] })
	.then(function(movies) {
		// console.log(JSON.stringify(movies));
		res.json(movies);
	})
	.catch(next);

	// Students.findAll({})
	// .then(students => res.json(students))
	// .catch(next);

});

api.get('/movies', (req, res, next) => {
	Movies.findAll({ order: [['id', 'DESC']] })
	.then(function(movies) {
		// console.log(JSON.stringify(movies));
		res.json(movies);
	})
	.catch(next);

	// Students.findAll({})
	// .then(students => res.json(students))
	// .catch(next);

});

// ADD MOVIE
api.post('/movies/new', (req, res, next) => {
	const title=req.body.Title,
		poster=req.body.Poster,
		year=req.body.Year,
		plot=req.body.Plot,
		imdbID=req.body.imdbID;

	console.log("TEST", req.body, imdbID);

	Movies.findAll({ where: {imdbID: imdbID} })
	.then(function (data) {
		if(data.length){
			console.log('dont create',data[0].dataValues);
			res.send(data[0].dataValues);
		}else{
			console.log('create');
			Movies.create({
				title: title,
				poster: poster,
				year: year,
				plot: plot,
				imdbID: imdbID
			})
			.then(function (data) {
				console.log("DATA",data.dataValues);
				res.json(data.dataValues);
			})
			.catch(next);
		}
	});
});

// EDIT MOVIE
api.put('/movies/edit/:movieId', (req, res, next) => {
	var studentId=req.params.studentId;
	var studentFirst=req.body.firstName;
	var studentLast=req.body.lastName;
	var studentEmail=req.body.email;
	var studentImage=req.body.image;
	var studentCampus=Number(req.body.campusId);

	if(!Number(studentId)){res.sendStatus(500);}
	else{
		Students.findById(studentId)
		.then(function (data) {
			if(data){
				data.update({
					firstName: studentFirst,
					lastName: studentLast,
					email: studentEmail,
					image: studentImage,
					campusId: studentCampus
				})
				.then(function() {
					res.send(data);
				});
			}
			else{
				res.sendStatus(404);
			}
		});
	}
});

// DELETE MOVIE
api.delete('/movies/:movieId', (req, res, next) => {
	var studentId=req.params.studentId;

	if(!Number(studentId)){res.sendStatus(500)}
	else {
		Students.findById(studentId)
		.then(function (data) {
			if (data) {
				res.status(204);
				data.destroy({force: true})
				.then(function (data) {
					res.send(data);
				});
			}
			else {
				res.sendStatus(404);
			}
		});
	}

	// Students.destroy({
	//     where: {
	//         id: e.target.id
	//     }
	// })
	// .then(function (data) {
	//     console.log("data",data);
	//     if(data===0){res.sendStatus(404);}
	//     else{
	//         res.status(204);
	//         res.send('done');
	//     }
	//
	// })
	// .catch(next);

});


// ++++++++++++++++++++
// STUDENTS
// ++++++++++++++++++++

// STUDENTS
// GET ALL
api.get('/students', (req, res, next) => {
	Students.findAll({ include: [ Campuses ], order: [['id', 'DESC']] })
	.then(function(students) {
		// console.log(JSON.stringify(students));
		res.json(students);
	})
	.catch(next);

	// Students.findAll({})
	// .then(students => res.json(students))
	// .catch(next);

});

// GET BY ID
api.get('/students/:studentId', (req, res, next) => {
	var studentId=req.params.studentId;

	if(!Number(studentId)){res.sendStatus(500);}
	else{
		Students.findAll({where:{id:studentId}, include: [ Campuses ]})
		.then(function (data) {
			if(data){res.json(data)}
			else{
				res.sendStatus(404);
			}
		});
	}

});

// ADD STUDENT
api.post('/students/new', (req, res, next) => {
	var studentFirst=req.body.firstName;
	var studentLast=req.body.lastName;
	var studentEmail=req.body.email;
	var studentImage=req.body.image;
	var studentCampus=Number(req.body.campusId);
	console.log("TEST", req.body);

	Students.create({
		firstName: studentFirst,
		lastName: studentLast,
		email: studentEmail,
		image: studentImage,
		campusId: studentCampus
	})
	.then(function (data) {
		console.log("DATA",data);
		res.sendStatus(201);
	})
	.catch(next);

});

// EDIT STUDENT
api.put('/students/edit/:studentId', (req, res, next) => {
	var studentId=req.params.studentId;
	var studentFirst=req.body.firstName;
	var studentLast=req.body.lastName;
	var studentEmail=req.body.email;
	var studentImage=req.body.image;
	var studentCampus=Number(req.body.campusId);

	if(!Number(studentId)){res.sendStatus(500);}
	else{
		Students.findById(studentId)
		.then(function (data) {
			if(data){
				data.update({
					firstName: studentFirst,
					lastName: studentLast,
					email: studentEmail,
					image: studentImage,
					campusId: studentCampus
				})
				.then(function() {
					res.send(data);
				});
			}
			else{
				res.sendStatus(404);
			}
		});
	}
});

// DELETE STUDENT
api.delete('/students/:studentId', (req, res, next) => {
	var studentId=req.params.studentId;

	if(!Number(studentId)){res.sendStatus(500)}
	else {
		Students.findById(studentId)
		.then(function (data) {
			if (data) {
				res.status(204);
				data.destroy({force: true})
				.then(function (data) {
					res.send(data);
				});
			}
			else {
				res.sendStatus(404);
			}
		});
	}

	// Students.destroy({
	//     where: {
	//         id: e.target.id
	//     }
	// })
	// .then(function (data) {
	//     console.log("data",data);
	//     if(data===0){res.sendStatus(404);}
	//     else{
	//         res.status(204);
	//         res.send('done');
	//     }
	//
	// })
	// .catch(next);

});


// ++++++++++++++++++++
// CAMPUSES
// ++++++++++++++++++++

// CAMPUS
// GET ALL
api.get('/campuses', (req, res, next) => {
	Campuses.findAll({ include: [ Students ], order: [['name', 'ASC']] })
	.then(campuses=>{
		res.json(campuses);
	})
	.catch(next);
});

// GET BY ID
api.get('/campuses/:campusId', (req, res, next) => {
	var campusId=req.params.campusId;
	if(!Number(campusId)){res.sendStatus(500);}
	else{
		Campuses.findById(campusId)
		.then(function (data) {
			if(data){
				res.json(data);
			}
			else{
				res.sendStatus(404);
			}
		});
	}
});

// GET STUDENTS IN CAMPUS
api.get('/campuses/:campusId/students', (req, res, next) => {
	var campusId=req.params.campusId;

	if(!Number(campusId)){res.sendStatus(500);}
	else{
		Students.findAll({where:{campusId:campusId},include: [ Campuses ], order: [['firstName', 'ASC']]})
		.then(function (data) {
			if(data){res.json(data);}
			else{
				res.sendStatus(404);
			}
		});
	}

});

// ADD CAMPUS
api.post('/campuses/new', (req, res, next) => {
	console.log('HELLO',req.body);
	var campusName=req.body.name;
	var campusImage=req.body.image;

	Campuses.create({name:campusName,image:campusImage})
	.then(function (data) {
		console.log("DATA",data);
		res.status(201);
		res.send(data);
	})
	.catch(next);

});

// EDIT CAMPUS
api.put('/campuses/edit/:campusId', (req, res, next) => {
	console.log('HELLO',req.body,req.params.campusId);

	var campusId=req.params.campusId;
	var campusName=req.body.name;
	var campusImage=req.body.image;

	if(!Number(campusId)){res.sendStatus(500);}
	else{
		Campuses.findById(campusId)
		.then(function (data) {
			if(data){
				data.update({
					name: campusName,
					image: campusImage
				})
				.then(function() {
					res.send(data);
				});

			}
			else{
				res.sendStatus(404);
			}
		});
	}

});

// DELETE CAMPUS
api.delete('/campuses/:campusId', (req, res, next) => {
	var campusId=req.params.campusId;

	if(!Number(campusId)){res.sendStatus(500)}
	else {
		Campuses.findById(campusId)
		.then(function (data) {
			// console.log(data);
			if (data) {
				res.status(204);
				data.destroy({force: true})
				.then(function (data) {
					res.send(data);

					// re-query send back data of all campuses
					// doesn't work
					// Campuses.findAll({})
					// .then(campuses => {
					//     console.log("campuses========",campuses[0],"campuses========");
					//     res.send(campuses[0]);
					// })
					// .catch(next);
				});
			}
			else {
				res.sendStatus(404);
			}
		});
	}

});

module.exports = api;