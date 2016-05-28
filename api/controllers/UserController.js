/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var redirect = "http://192.168.1.114/tesseract/";
var redirect = "https://blazen.io/my-app";
var appurl = "http://app.blazen.io/config/callOne";
// var appurl = "http://192.168.1.129:1337/config/callOne";
var request = require("request");
module.exports = {
    register: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                if (data._id) {
                    req.session.user = data;
                    setTimeout(function() {
                        res.json({
                            value: true,
                            _id: data._id
                        });
                    }, 3000);
                } else {
                    res.json({
                        value: false
                    });
                }
            }
        };
        if (req.body) {
            req.body.status = 1;
            User.register(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    ///////////////////////////////
    login: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                if (data._id) {
                    req.session.user = data;
                    setTimeout(function() {
                        res.json({
                            value: true,
                            _id: data._id
                        });
                    }, 3000);
                } else {
                    res.json({
                        value: false
                    });
                }
            }
        };
        if (req.body.email && req.body.email != "" && req.body.password && req.body.password != "") {
            User.login(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Email or Password"
            });
        }
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                res.json({
                    value: false,
                    error: err
                });
            } else {
                res.json({
                    value: true
                });
            }
        });
    },
    profile: function(req, res) {
        var user = req.session.user;
        if (user) {
            res.json(user);
        } else {
            res.json({
                value: false
            });
        }
    },
    loginFacebook: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.redirect(redirect);
                    }
                });
            }
        };
        Passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email']
        }, callback)(req, res);
    },
    loginTwitter: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.redirect(redirect);
                    }
                });
            }
        };
        Passport.authenticate('twitter', {}, callback)(req, res);
    },
    loginGoogle: function(req, res) {
        Passport.authenticate('google', {
            scope: ['openid', 'profile', 'email']
        })(req, res);
    },
    loginGoogleCallback: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.redirect(redirect);
                    }
                });
            }
        };
        Passport.authenticate('google', {
            failureRedirect: '/login'
        }, callback)(req, res);
    },
    loginGithub: function(req, res) {
        Passport.authenticate('github', {
            scope: 'public_repo'
        })(req, res);
    },
    loginGithubCallback: function(req, res) {
        var callback = function(err, data) {
            if (err || _.isEmpty(data)) {
                res.json({
                    error: err,
                    value: false
                });
            } else {
                req.session.user = data;
                // console.log(req.session);
                req.session.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.redirect(redirect);
                    }
                });
            }
        };
        Passport.authenticate('github', {
            failureRedirect: '/login'
        }, callback)(req, res);
    },
    create: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            User.create(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    delete: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                User.delete(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    viewAll: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            User.viewAll(req.body, callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    view: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body._id && req.body._id != "") {
                User.view(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    findlimited: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            if (req.body.pagesize && req.body.pagesize !== "" && req.body.pagesize && req.body.pagesize !== "") {
                User.findlimited(req.body, callback);
            } else {
                res.json({
                    value: false,
                    data: "Invalid Id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    forgotPassword: function(req, res) {
        if (req.body) {
            if (req.body.email && req.body.email != "") {
                User.forgotPassword(req.body, function(err, data) {
                    if (err) {
                        res.json(err);
                    } else {
                        if (data.comment == "Mail Sent") {
                            res.json({
                                value: true,
                                data: data
                            });
                        } else {
                            res.json({
                                value: false,
                                data: data
                            });
                        }
                    }
                });
            } else {
                res.json({
                    value: false,
                    data: "Please provide email-id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    unsubscribe: function(req, res) {
        if (req.body) {
            if (req.body.email && req.body.email != "") {
                User.unsubscribe(req.body, res.callback);
            } else {
                res.json({
                    value: false,
                    data: "Please provide email-id"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Call"
            });
        }
    },
    createApp: function(req, res) {
        req.connection.setTimeout(600000);
        res.connection.setTimeout(600000);
        if (req.session.user) {
            req.body.sendme = req.session.user._id;
            req.body.name = req.session.user.name;
            request.post({
                url: appurl,
                json: req.body
            }, function(err, http, body) {
                console.log(body);
                if (err) {
                    console.log(err);
                    res.json({
                        value: false,
                        data: err
                    });
                } else {
                    res.json({
                        value: true,
                        data: body.data
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "User not logged in"
            });
        }
    }
};
