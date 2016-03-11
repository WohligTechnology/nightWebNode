/**
 * SuggestionController
 *
 * @description :: Server-side logic for managing suggestions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `SuggestionController.create()`
     */
    create: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        if (req.body) {
            Suggestion.create(req.body, callback);
        } else {
            res.json({
                value: false,
                comment: "No data found"
            });
        }
    },

    /**
     * `SuggestionController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Suggestion.delete(req.body, callback);
    },


    /**
     * `SuggestionController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        Suggestion.viewAll(req.body, callback);
    },


    /**
     * `SuggestionController.view()`
     */
    view: function (req, res) {
     function callback(err, data) {
         Config.GlobalCallback(err, data, res);
     }
     Suggestion.view(req.body, callback);
 }
};
