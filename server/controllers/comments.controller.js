const mongoose = require('mongoose');
const express = require('express');
const crypto = require('crypto');
const moment = require('moment');
const Comment = require('../data/db.js').Comment;
const User = require('../data/db.js').User;

const limit = 10;
const commentsFields = 'email message';
const usersFields = 'email lastActive';
const avatarLink = 'https://www.gravatar.com/avatar/';

function buildResponse(comments, users) {
    return comments.map((comment) =>{
        const hashEmail = crypto.createHash('md5').update(comment.email).digest("hex");
        const lastActiveObject = users.find((user) => {
            if (user.email === comment.email) return user.lastActive;
        });

        return {
            email: comment.email,
            message: comment.message,
            avatar: avatarLink + hashEmail,
            lastActive: lastActiveObject.lastActive
        }
    });
}

function handleError(res, err) {
    console.log(err);

    return res.send(500, { error: 'Ops, something went wrong!' });
}

module.exports.getComments = function getComments(req, res) {
    const page = req.query.page;
    const filterFromServer = req.query.filter;

    if (!page) return res.send(400);

    const commentsFilter = filterFromServer ? { email: { $regex: filterFromServer, $options: "i" } } : {}

    Comment.find(commentsFilter, commentsFields, function(err, comments){
        if (err) return handleError(res, err);


        User.find({}, usersFields, function(err, users){
            if (err) return handleError(res, err);

            res.send(buildResponse(comments, users));
        });
    }).limit( limit ).skip((page * limit));
};

module.exports.postComment = function postComment(req, res) {
    const email = req.body.email;
    const message = req.body.message;

    if (!email || !message) res.send(400);

    const newComment = new Comment({ email, message });

    newComment.save(function (err) {
        if (err) return handleError(res, err);
     });

    User.findOneAndUpdate({ email: email }, { lastActive: moment().format("DD.MM.YY HH:mm:ss") }, { upsert: true }, function(err, doc){
        if (err) return handleError(res, err);
    });

    res.send(200);
};
