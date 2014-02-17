var express = require('express');
var note = require('./lib/controllers/note');
var error = require('./lib/middlewares/error');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'jade');


app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', note.list);
app.get('/:author', note.list);
app.post('/:author/:note', note.create);
app.put('/:author/:note', note.update);
app.del('/:author/:note', note.remove);

app.use(error.notFound);
app.use(error.serverError);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server on port ' + app.get('port'));
});
