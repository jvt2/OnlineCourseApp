const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./database/db');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    // Check if user exists in the database
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (error, results) => {
      if (error) return done(error);
      if (results.length === 0) {
        return done(null, false, { message: 'No user with that username' });
      }
      const user = results[0];
      // Compare Passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      done(err, results[0]);
    });
  });
};
