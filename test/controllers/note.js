var request = require('supertest');
var redis = require('redis').createClient();
var app = require('../app');
var Note = require('../lib/models/note');
var note;

describe('Testing Note API:', function () {

  before(function (done) {
    mongoose.connection.on('open', function () {
      note = new Note({
        'user': 1,
        'title': 'Implement tests for controller',
        'content': 'Use supertest, mocha and should modules'
      });

      note.save(function (err) {
        if (err) {
          return done(err);
        }
        done();
      });

    });
  });

  it('POST "/note" should return an error, title is required', function (done) {
    request(app)
      .post('/note')
      .set('Accept', 'application/json')
      .set('user', 1)
      .set('session', 'test')
      .send({
        content: 'Is needed the method create'
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('POST "/note" should create a new note note', function (done) {
    request(app)
      .post('/note')
      .set('Accept', 'application/json')
      .set('user', 1)
      .set('session', 'test')
      .send({
        title: 'Implement controller',
        content: 'Is needed the method create'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.should.have.property('id');
        res.body.id.should.be.an.String;
        done();
      });
  });

  it('GET /user/2 should list a empty array', function (done) {
    request(app)
      .get('/user/2')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.notes.should.be.an.Array;
        res.body.notes.should.have.length(0);
        done();
      });
  });

  it('GET /user/1 should list two items', function (done) {
    request(app)
      .get('/user/1')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.body.notes.should.be.an.Array;
        res.body.notes.should.have.length(2);
        done();
      });
  });

  it('PUT /note/:id should return an error, bad user', function (done) {
    request(app)
      .put('/note/' + note.id)
      .set('Accept', 'application/json')
      .set('user', 2)
      .set('session', 'test')
      .send({
        title: 'Implement controller',
        content: 'Is needed the method update'
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('PUT /note/:id should update an existing note note', function (done) {
    request(app)
      .put('/note/' + note.id)
      .set('Accept', 'application/json')
      .set('user', 1)
      .set('session', 'test')
      .send({
        title: 'Implement controller',
        content: 'Is needed the method update'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('DEL /note/:id should return a error, bad user', function (done) {
    request(app)
      .del('/note/' + note.id)
      .set('Accept', 'application/json')
      .set('user', 2)
      .set('session', 'test')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('DEL /note/:id should remove an existing note note', function (done) {
    request(app)
      .del('/note/' + note.id)
      .set('Accept', 'application/json')
      .set('user', 1)
      .set('session', 'test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  after(function (done) {
    Note.remove({}, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

});