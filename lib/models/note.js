function Note (index, author, content) {
  this.index = index;
  this.author = author;
  this.content = content;
  this.done = false;
}

Note.prototype.done = function () {
  this.done = true;
};

Note.prototype.undone = function () {
  this.done = false;
};

module.exports = Note;