/**
 * Created by ChangLiu on 7/1/17.
 */
module.exports = function(app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    passport.use('LocalStrategy', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // GET Calls.
    // app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user', findUserByUsername);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/credentials', findUserByCredentials);

    // POST Calls.
    app.post('/api/user', createUsers);

    // PUT Calls.
    app.put('/api/user/:uid', updateUser);

    // DELETE Calls.
    app.delete('/api/user/:uid', deleteUser);

    app.post('/api/login', passport.authenticate('LocalStrategy'), login);
    app.get('/api/checkLoggedIn', checkLoggedIn);
    app.post('/api/register', register);
    app.post('/api/logout', logout);


        // app.post('api/search', searchTrail);
    //
    //
    //
    // function searchTrail() {
    //
    // }
    
    


    /*API implementation*/
    function createUsers(req, res) {
        var user = req.body;
        models
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        models
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        models
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.json(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        models
            .userModel
            .findUserById(uid)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        user = null;
                        res.send(user);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var uid = req.params.uid;
        var new_user = req.body;
        new_user.password = bcrypt.hashSync(new_user.password);
        models
            .userModel
            .updateUser(uid, new_user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        models
            .userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function localStrategy(username, password, done) {
        models
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else if (user && !bcrypt.compareSync(password, user.password)) {
                        return done(null, null);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        models
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        models
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    req.login(newUser, function (status) {
                        res.json(newUser);
                    });
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function checkLoggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }
};