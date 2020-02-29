const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const Sponsor = require('../models/sponsor');
const cors = require('./cors');

const sponsorRouter = express.Router();

sponsorRouter.use(bodyParser.json());

sponsorRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Sponsor.find()
    .then(sponsors => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sponsors);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Sponsor.create(req.body)
    .then(sponsor => {
        console.log('Sponsor Created ', sponsor);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sponsor);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /sponsors');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Sponsor.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

sponsorRouter.route('/:sponsorId')
.options(cors.corsWithOptions, (req, res) => res.statusCode(200))
.get(cors.cors, (req, res) => {
    Sponsor.findById(req.params.sponsorId)
    .then(sponsor => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        res.json(sponsor);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /sponsors/${req.params.sponsorId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Sponsor.findByIdAndUpdate(req.params.sponsorId, {
        $set: req.body
}, {new:true })
    .then(sponsor => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(sponsor);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Sponsor.findByIdAndDelete(req.params.sponsorId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = sponsorRouter;