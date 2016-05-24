/**
 * NewsletterController
 *
 * @description :: Server-side logic for managing Newsletters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    create: function(req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Newsletter.create(req.body, callback);
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
            if (req.body._id && req.body._id !== "") {
                Newsletter.delete(req.body, callback);
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
            Newsletter.viewAll(req.body, callback);
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
                Newsletter.view(req.body, callback);
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
                    Newsletter.findlimited(req.body, callback);
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
    }
};
