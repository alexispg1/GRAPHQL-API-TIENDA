var express = require('express');
var logger = require('morgan');

var graphqlHTTP = require('express-graphql');
var schema = require('./graphql/productSchema');
var cors = require('cors');

var indexRouter = require('./routes/index');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
}));

module.exports = app;
