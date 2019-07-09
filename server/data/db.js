const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://panda:A123456!@ds249127.mlab.com:49127/panda');

const schema = new mongoose.Schema({
    email: String,
    message: String,
}, {collection: 'comments' });

const Comments = mongoose.model('comments', schema);

module.exports.Comments = Comments;
