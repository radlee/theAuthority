exports.show = function(req, res, next){
  req.getConnection(function(err, connection){
    if(err) return next(err);
    connection.query('select * from Users', [], function(err, results){
      if(err) return next(err);
      res.render('page5', {
        no_users : results.length == 0,
        users : results
      });
    });
  });
};


// Dont know how it works
exports.authenticate = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from Users', [], function(err, results) {
    });
  });
};
