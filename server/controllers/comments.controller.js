const mongoose = require('mongoose');
const express = require('express');
const crypto = require('crypto');
const Comments = require('../data/db.js').Comments;

const limit = 10;
const fields = 'email message';
const avatarLink = 'https://www.gravatar.com/avatar/';

function buildResponse(comments) {
    return comments.map((comment) =>{
        const hashEmail = crypto.createHash('md5').update(comment.email).digest("hex");

        return {
            email: comment.email,
            message: comment.message,
            avatar: avatarLink + hashEmail
        }
    });
}

module.exports.getComments = function getComments(req, res) {
    const page = req.query.page;
    const filterFromServer = req.query.filter;

    if (!page) res.status(400);

    const filter = filterFromServer ? { email: { $regex: filterFromServer, $options: "i" } } : {}

    Comments.find(filter, fields, function(err, comments){
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);

            res.status(500);
        }

        res.send(buildResponse(comments));
    }).limit( limit ).skip((page * limit));
};

module.exports.postComment = function postComment(req, res) {
    const email = req.body.email;
    const message = req.body.message;

    if (!email || !message) res.status(400);

    const newComment = new Comments({ email, message });

     newComment.save(function (err) {
         if (err) {
           console.log('Unable to connect to the mongoDB server. Error:', err);

           res.status(500);
         }

         res.status(200).json({});
     });
};
