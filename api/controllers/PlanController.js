/**
 * PlanController
 *
 * @description :: Server-side logic for managing plans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */




module.exports = {

    /**
     * `PlanController.create()`
     */
    create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Plan.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },


    /**
     * `PlanController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Plan.delete(req.body, callback);
    },


    /**
     * `PlanController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Plan.viewAll(req.body, callback);
    },


    /**
     * `PlanController.view()`
     */
    view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Plan.view(req.body, callback);
    },
    findlimited: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Plan.findlimited(req.body, callback);
    }
};
