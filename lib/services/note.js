redis = require('redis').createClient();

exports.list = function (author, cb) {
  var notes = [];
  var note;
  var i;


  var getNote = function (index) {
    redis.hgetall(author + ':' + index, function (err, note) {
      if (err || !note) return;
      notes.push(note);
    });
  };

  for (i = 0; i < 10; i++) {
    note = nextNote(i);
    
    if (!note) break;
    notes.push();
  }

  return cb(null, notes);
};

function save(note, cb) {
  redis.hmset(note.author + ':' + note.index, note, cb);
}

exports.create = function (note, cb) {
  save(note, cb);
};

exports.update = function (note, cb) {
  save(note, cb);
};

exports.remove = function (note, cb) {
  redis.hdel(note.author + ':' + note.index, "author");
  redis.hdel(note.author + ':' + note.index, "content");
  redis.hdel(note.author + ':' + note.index, "index");
  redis.hdel(note.author + ':' + note.index, "done");
};