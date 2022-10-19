var express = require('express');

const Members = require('../models/members');

const memberRouter = express.Router()

memberRouter.route('/')
.get((req, res, next) => {
    Members.find().then((members) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(members);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.post((req, res, next) => {
    Members.create(req.body).then((member) => {
        console.log('Member created!');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({created: 'successfull', member: member});
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /members');
})
.delete((req, res, next) => {
    Members.deleteMany({}).then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

memberRouter.route('/:memberId')
.get((req, res, next) => {
    Members.findById(req.params.memberId)
    .then((member) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(member);
    }, (err)=> next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /members/' + req.params.memberId);
})
.put((req, res, next) => {
    Members.findByIdAndUpdate(req.params.memberId, {$set: req.body}, {new: true})
    .then((member) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(member);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Members.findByIdAndDelete(req.params.memberId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = memberRouter;