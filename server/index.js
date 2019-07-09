const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const commentsRouter = require('./routes/comments.routes')

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use('/comments', commentsRouter);

app.listen(3001, () =>
    console.log('Express server is running on localhost:3000')
);
