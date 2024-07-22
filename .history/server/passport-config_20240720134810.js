//passport-config.js

const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const db = require('./database/db');

module.exports = function(passport) {
  // Local Strategy
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

  // JWT Strategy
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret', // Replace with your actual secret key
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [jwt_payload.email], (error, results) => {
      if (error) {
        return done(error, false);
      }
      if (results.length > 0) {
        return done(null, results[0]);
      } else {
        return done(null, false);
      }
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

