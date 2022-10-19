var express = require('express');

const Member = require('../models/member');

const memberRouter = express.Router()

memberRouter.route('/')
.get((req, res, next) => {
    Member.find().then((members) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(members);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.post((req, res, next) => {
    Member.create(req.body).then((member) => {
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
    Member.deleteMany({}).then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = memberRouter;