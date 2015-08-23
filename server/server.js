/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var apiRoutes = require('./api-routes');
var path = require('path');
var mongoose = require('mongoose');
var reactViews = require('express-react-views');
require('node-jsx').install();

mongoose.connect('mongodb://admin:password@ds035533.mongolab.com:35533/react-bingo')
//mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('mongodb opened!!!!');
})

// This should refer to the local React and gets installed via `npm install` in
// the example.

// all environments
app.set('views', __dirname + '/../app/react/components/');
app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());

app.use(express.static('build'));


app.use('/api/bingo', apiRoutes);
app.use('/', routes);

app.listen(process.env.PORT || 3000, function(){
	console.log('listening');
})