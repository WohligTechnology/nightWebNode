/**
 * UserplanController
 *
 * @description :: Server-side logic for managing userplans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `UserplanController.create()`
     */
    create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Userplan.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },




    /**
     * `UserplanController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Userplan.delete(req.body, callback);
    },


    /**
     * `UserplanController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Userplan.viewAll(req.body, callback);
    },


    /**
     * `UserplanController.view()`
     */
    view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Userplan.view(req.body, callback);
    },


    /**
     * `UserplanController.viewByUser()`
     */
    viewByUser: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Userplan.viewByUser(req.body, callback);
    }
};
