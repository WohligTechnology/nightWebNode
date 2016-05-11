/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var lodash = require('lodash');
var md5 = require('md5');
var request = require('request');
var sendgrid = require('sendgrid')('');
var user = "Vignesh";
var pass = "d558864b10d78bd95f0e8984faa5bb7d-us13";
var auth = new Buffer(user + ':' + pass).toString('base64');
var campaignid = "91b51be488";

var Schema = mongoose.Schema;
var schema = new Schema({
    name: String,
    email: String,
    password: String,
    logintype: String,
    facebook: String,
    twitter: String,
    google: String,
    forgotpassword: String,
    accesslevel: String,
    contact: String,
    oauthLogin: {
        type: [{
            socialProvider: String,
            socialId: String,
            modificationTime: Date
        }],
        index: true
    },
});

module.exports = mongoose.model('User', schema);

var models = {
    register: function(data, callback) {
        if (data.password && data.password != "") {
            data.password = md5(data.password);
        }
        var user = this(data);
        this.count({
            "email": data.email
        }).exec(function(err, data2) {
            if (err) {
                callback(err, data);
            } else {
                if (data2 === 0) {
                    user.save(function(err, data3) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var split = data.name.split(" ");
                            request.post({
                                url: "https://us13.api.mailchimp.com/3.0/lists/" + campaignid + "/members/",
                                json: {
                                    "email_address": data3.email,
                                    "status": "subscribed",
                                    "merge_fields": {
                                        "FNAME": split[0],
                                        "LNAME": split[1]
                                    }
                                },
                                headers: {
                                    'Authorization': 'Basic ' + auth,
                                    'Content-Type': 'application/json'
                                }
                            }, function(err, http, body) {
                                if (err) {
                                    callback({
                                        value: false,
                                        comment: err
                                    });
                                } else {
                                    data3.password = '';
                                    callback(null, data3);
                                }
                            });
                        }
                    });
                } else {
                    callback("Email already Exists", false);
                }

            }
        });
    },
    create: function(data, callback) {
        if (data.password && data.password != "") {
            data.password = md5(data.password);
        }
        var user = this(data);
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            user.save(function(err, data) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, data);
                }
            });
        }
    },
    // viewall
    viewAll: function(data, callback) {
        this.find({}, {
            forgotpassword: 0
        }).exec(callback);
    },

    //    view one

    view: function(data, callback) {
        this.findOne({
            "_id": data._id
        }, {
            forgotpassword: 0
        }).exec(callback);
    },
    // delete

    delete: function(data, callback) {
        this.findOneAndRemove({
            _id: data._id
        }, function(err, data) {

            if (err) {
                callback(err, false);
            } else {
                callback(null, data);
            }
        });
    },
    findlimited: function(data, callback) {
        var newreturns = {};
        newreturns.data = [];
        var check = new RegExp(data.search, "i");
        var sort = {};
        data.sortnum = parseInt(data.sortnum);
        sort[data.sort] = data.sortnum; //sort in ascending
        data.pagenumber = parseInt(data.pagenumber);
        data.pagesize = parseInt(data.pagesize);
        async.parallel([
                function(callback) {
                    User.count({
                        $or: [{
                            name: {
                                '$regex': check
                            }
                        }, {
                            email: {
                                '$regex': check
                            }
                        }]
                    }).exec(function(err, number) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (number && number != "") {
                            newreturns.total = number;
                            newreturns.totalpages = Math.ceil(number / data.pagesize);
                            newreturns.pageno = data.pagenumber;
                            callback(null, newreturns);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                },
                function(callback) {
                    User.find({
                        $or: [{
                            name: {
                                '$regex': check
                            }
                        }, {
                            email: {
                                '$regex': check
                            }
                        }]
                    }, {
                        password: 0
                    }, { sort: sort }).skip(data.pagesize * (data.pagenumber - 1)).limit(data.pagesize).exec(function(err, data2) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (data2 && data2.length > 0) {
                            newreturns.data = data2;
                            callback(null, newreturns);
                        } else {
                            callback(null, newreturns);
                        }
                    });
                }
            ],
            function(err, data4) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (data4) {
                    callback(null, newreturns);
                } else {
                    callback(null, newreturns);
                }
            });
    },
    forgotPassword: function(data, callback) {
        this.findOne({
            email: data.email
        }, {
            password: 0,
            forgotpassword: 0
        }, function(err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                if (found) {
                    if (!found.oauthLogin[0]) {
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        for (var i = 0; i < 8; i++) {
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                        }
                        var encrypttext = md5(text);
                        this.findOneAndUpdate({
                            _id: found._id
                        }, {
                            forgotpassword: encrypttext
                        }, function(err, data2) {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            } else {
                                sendgrid.send({
                                    to: found.email,
                                    from: "info@wohlig.com",
                                    subject: "One Time Password For Blazen",
                                    html: "<html><body><p>Dear " + found.name + ",</p><p>Your One Time Password for Blazen is " + text + "</p></body></html>"
                                }, function(err, json) {
                                    if (err) {
                                        callback(err, null);
                                    } else {
                                        callback(null, {
                                            comment: "Mail Sent"
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        callback(null, {
                            comment: "User logged in through social login"
                        });
                    }
                } else {
                    callback(null, {
                        comment: "User not found"
                    });
                }
            }
        });
    },
    login: function(data, callback) {
        data.password = md5(data.password);
        User.findOne({
            email: data.email,
            password: data.password
        }, function(err, data2) {
            if (err) {
                console.log(err);
                callback(er, null);
            } else {
                if (_.isEmpty(data2)) {
                    User.findOne({
                        email: data.email,
                        forgotpassword: data.password
                    }, function(err, data4) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            if (_.isEmpty(data4)) {
                                callback(null, {
                                    comment: "User Not Found"
                                });
                            } else {
                                User.findOneAndUpdate({
                                    _id: data4._id
                                }, {
                                    password: data.password,
                                    forgotpassword: ""
                                }, function(err, data5) {
                                    if (err) {
                                        console.log(err);
                                        callback(err, null);
                                    } else {
                                        data5.password = "";
                                        data5.forgotpassword = "";
                                        callback(null, data5);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    User.findOneAndUpdate({
                        _id: data2._id
                    }, {
                        forgotpassword: ""
                    }, function(err, data3) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            data3.password = "";
                            data3.forgotpassword = "";
                            callback(null, data3);
                        }
                    });
                }
            }
        });
    },
    unsubscribe: function(data, callback) {
        User.findOne({
            email: data.email
        }, function(err, data2) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(data2);
                console.log(data2.campaignid);
                request.patch({
                    url: "https://us13.api.mailchimp.com/3.0/lists/" + campaignid + "/members/" + data2.campaignid,
                    json: {
                        "status": "unsubscribed"
                    },
                    headers: {
                        'Authorization': 'Basic ' + auth,
                        'Content-Type': 'application/json'
                    }
                }, function(err, http, body) {
                    if (err) {
                        callback({
                            value: false,
                            comment: err
                        });
                    } else {
                        callback(null, body);
                    }
                });
            }
        });
    },

    // createApp: function(data, callback) {
    //     if (data.name) {
    //         exec
    //     } else {
    //         callback(null, { comment: "Please provide folder name" });
    //     }
    // }
};
module.exports = _.assign(module.exports, models);
