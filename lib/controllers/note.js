var service = require('../services/note');
var Note = require('../models/note');


exports.list = function(req, res, next) {
  var notes = service.list();

  res.json(200, {'notes': notes});
};

exports.create = function (req, res, next) {
  var index = req.body.index;
  var author = req.body.author;
  var content = req.body.content;

  var note = new Note(index, author, content);

  service.create(note, function (err, res) {
    if (err) next(err);
    res.json(200);
  });
};

exports.update = function (req, res, next) {
  var query = {
    _id: req.params.id,
    user: req.headers.user
  };

  var todo = {
    'title': req.body.title,
    'content': req.body.content
  };

  Todo
    .findOneAndUpdate(query, todo)
    .done(function (todo) {
      if (!todo) {
        var err = new Error('Not updated. Todo doesn\'t exists');
        err.name = 'ValidationError';
        return next(err);
      }
      res.json(200);
    }, function (err) {
      next(err);
    });
};

exports.remove = function (req, res, next) {
  var query = {
    _id: req.params.id,
    user: req.headers.user
  };

  Todo
    .findOneAndRemove(query)
    .done(function (todo) {
      if (!todo) {
        var err = new Error('Not updated. Todo doesn\'t exists');
        err.name = 'ValidationError';
        return next(err);
      }
      res.json(200);
    }, function (err) {
      next(err);
    });
};
