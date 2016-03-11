/**
 * DocumentationController
 *
 * @description :: Server-side logic for managing Documentations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */




module.exports = {

    /**
     * `DocumentationController.create()`
     */
    create: function (req, res) {
     function callback(err, data) {
         Config.GlobalCallback(err, data, res);
     }
     if (req.body) {
         Documentation.create(req.body, callback);
     } else {
         res.json({
             value: false,
             comment: "No data found"
         });
     }
 },


    /**
     * `DocumentationController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Documentation.delete(req.body, callback);
    },


    /**
     * `DocumentationController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Documentation.viewAll(req.body, callback);
    },


    /**
     * `DocumentationController.view()`
     */
    view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Documentation.view(req.body, callback);
    },
    findlimited: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Documentation.findlimited(req.body, callback);
    }
};
