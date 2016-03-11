/**
 * BlogController
 *
 * @description :: Server-side logic for managing Blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */




module.exports = {

    /**
     * `BlogController.create()`
     */
    create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Blog.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },


    /**
     * `BlogController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Blog.delete(req.body, callback);
    },


    /**
     * `BlogController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Blog.viewAll(req.body, callback);
    },


    /**
     * `BlogController.view()`
     */
    view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Blog.view(req.body, callback);
    },
    findlimited: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Blog.findlimited(req.body, callback);
    }
};
