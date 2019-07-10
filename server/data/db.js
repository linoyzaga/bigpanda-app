const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://panda:A123456!@ds249127.mlab.com:49127/panda');

const commentsSchema = new mongoose.Schema({
    email: String,
    message: String
}, {collection: 'comments' });

const usersSchema = new mongoose.Schema({
    email: String,
    lastActive: String
}, {collection: 'users' });

const Comments = mongoose.model('comments', commentsSchema);
const Users = mongoose.model('users', usersSchema);

module.exports.Comments = Comments;
module.exports.Users = Users;
