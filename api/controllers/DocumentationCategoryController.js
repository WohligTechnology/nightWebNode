/**
 * DocumentationCategoryController
 *
 * @description :: Server-side logic for managing DocumentationCategorys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */




module.exports = {

    /**
     * `DocumentationCategoryController.create()`
     */
    create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            DocumentationCategory.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },


    /**
     * `DocumentationCategoryController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        DocumentationCategory.delete(req.body, callback);
    },


    /**
     * `DocumentationCategoryController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        DocumentationCategory.viewAll(req.body, callback);
    },


    /**
     * `DocumentationCategoryController.view()`
     */
    view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        DocumentationCategory.view(req.body, callback);
    },
    findlimited: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        DocumentationCategory.findlimited(req.body, callback);
    }
};
