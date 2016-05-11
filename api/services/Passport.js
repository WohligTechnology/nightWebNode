var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = require("passport");

module.exports.use(new FacebookStrategy({
        clientID: "141304936259731",
        clientSecret: "322f66550b62b9492e7271615de6ae40",
        callbackURL: "/user/loginFacebook/",
        enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
        if (!_.isEmpty(profile)) {
            User.find({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };

                    if (data.length !== 0) {
                        done(err, data);
                    } else {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));

module.exports.use(new TwitterStrategy({
        consumerKey: "gZPPSIqZHL3mqlgq76bBc4Yqq",
        consumerSecret: "FGZTNSrJjztzlSsoX5TzvnWzVTFfpbw4D8veCFH8ME75Jup2CK",
        callbackURL: "/user/loginTwitter/"
    },
    function(token, tokenSecret, profile, done) {
        if (!_.isEmpty(profile)) {
            User.find({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };

                    if (data.length !== 0) {
                        done(err, data);
                    } else {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));


module.exports.use(new GoogleStrategy({
        clientID: "265970827010-j10v7hj6j1gs8pvsu9vcs421c0atd3ic.apps.googleusercontent.com",
        clientSecret: "HCcktl431UlXsdiOa78Cu5VK",
        callbackURL: "/user/loginGoogleCallback"
    },
    function(token, tokenSecret, profile, done) {
        if (!_.isEmpty(profile)) {
            User.find({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };

                    if (data.length !== 0) {
                        done(err, data);
                    } else {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));


module.exports.use(new GitHubStrategy({
        clientID: "613446cca4d561df639c",
        clientSecret: "8dd35b91214524c11fe01f135076f9d525eeb7be",
        callbackURL: "/user/loginGithubCallback"
    },
    function(accessToken, refreshToken, profile, done) {
        if (!_.isEmpty(profile)) {
            var usertemp = {};
            User.find({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };
                    if (data.length !== 0) {
                        done(err, data);
                    } else {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));
