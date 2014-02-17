var redis = require('redis').createClient();

module.exports.list = function (author) {
  var notes = [];
  var note;
  var i;

  function nextNote(index) {
    return redis.hgetall(author + ':' + index, function (err, note) {
      if (err) return;
      return note;
    });
  }
  for (i = 0; i < 10; i++) {
    note = nextNote(i);
    if (!note) break;
    notes.push(note);
  }
  return notes;
};

module.exports.create = function (note, cb) {
  redis.hmset(note.author + ':' + note.index, note);
};

module.exports.update = function () {
  redis.hmset(note.author + ':' + note.index, note);
};

module.exports.delete = function () {
  redis.hdel(note.author + ':' + note.index, note);
};


