//passport-config.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./database/db');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config(); // Ensure this is at the top to load env variables

module.exports = function(passport) {
  // JWT Strategy
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_default_secret_key' // Use environment variable for secret key
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    const query = 'SELECT * FROM users WHERE id = ?'; // Changed to id to match payload
    db.query(query, [jwt_payload.id], (error, results) => {
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
