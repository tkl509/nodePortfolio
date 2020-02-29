const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Horse = require('../models/horse');
const cors = require('./cors');

const horseRouter = express.Router();

horseRouter.use(bodyParser.json());

horseRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Horse.find()
    .populate('comments.author')
    .then(horses => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(horses);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Horse.create(req.body)
    .then(horse => {
        console.log('Horse entry created ', horse);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(horse);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /horses');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Horse.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

horseRouter.route('/:horseId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Horse.findById(req.params.horseId)
    .then(horse => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(horse);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /horses/${req.params.horseId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Horse.findByIdAndUpdate(req.params.horseId, {
        $set: req.body
    }, {new:true })
    .then(horse => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(horse);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Horse.findByIdAndDelete(req.params.horseId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = horseRouter;