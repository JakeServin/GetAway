const userModel = require('./models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy("local", (username, password, done) => {
            userModel.findOne({ userName: username }, (err, user) => {
                if (err) throw err
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user)
                    }
                    else {
                        return done(null, false);
                    }
                })
            })
        })
    )

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })
    passport.deserializeUser((id, cb) => {
        userModel.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        })
    })
}