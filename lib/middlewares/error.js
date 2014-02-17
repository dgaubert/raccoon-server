exports.notFound = function (req, res, next) {
  res.json(404, { error: 'Not found' });
};

exports.serverError = function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.json(400, {error: err.message});
  }
  res.json(500, { error: err.message });
};
