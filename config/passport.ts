const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
// const User = require('../models').Users;
import db from '../models'
const Users = db.Users

module.exports = function(passport:any) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload:any, done:any) {
    Users
      .findByPk(jwt_payload.id)
      .then((user:any) => { return done(null, user); })
      .catch((error:any) => { return done(error, false); });
  }));
};