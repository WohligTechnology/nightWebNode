/**
 * UsernotificationController
 *
 * @description :: Server-side logic for managing usernotifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `UsernotificationController.create()`
     */
   create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Usernotification.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },



    /**
     * `UsernotificationController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Usernotification.delete(req.body, callback);
    },


    /**
     * `UsernotificationController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Usernotification.viewAll(req.body, callback);
    },


    /**
     * `UsernotificationController.view()`
     */
      view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Usernotification.view(req.body, callback);
    },


    /**
     * `UsernotificationController.viewByUser()`
     */
   
    viewByUser: function (req, res) {
     function callback(err, data) {
         Config.GlobalCallback(err, data, res);
     }
     Usernotification.viewByUser(req.body, callback);
 },
    findlimited: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Suggestion.findlimited(req.body, callback);
    }
};