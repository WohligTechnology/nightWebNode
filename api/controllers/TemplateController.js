/**
 * TemplateController
 *
 * @description :: Server-side logic for managing templates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `TemplateController.create()`
     */
    create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Template.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },



    /**
     * `TemplateController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Template.delete(req.body, callback);
    },


    /**
     * `TemplateController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Template.viewAll(req.body, callback);
    },


    /**
     * `TemplateController.view()`
     */
    view: function (req, res) {
      function callback(err, data) {
          Config.GlobalCallback(err, data, res);
      }
      Template.view(req.body, callback);
  }
};
