/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
  /**
   * `UserController.create()`
   */
  create: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err, data, res);
    }
    if (req.body) {
      User.create(req.body, callback);
    } else {
      res.json({
        value: false,
        comment: "No data found"
      });
    }
  },





    /**
     * `UserController.delete()`
     */
    delete: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        User.delete(req.body, callback);
    },


    /**
     * `UserController.viewAll()`
     */
    viewAll: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        User.viewAll(req.body, callback);
    },


    /**
     * `UserController.view()`
     */
    view: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        User.view(req.body, callback);
    },
    findlimited: function (req, res) {
        function callback(err, data) {
            Config.GlobalCallback(err, data, res);
        }
        User.findlimited(req.body, callback);

  /**
   * `UserController.delete()`
   */
  delete: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err, data, res);
    }
    User.delete(req.body, callback);
  },


  /**
   * `UserController.viewAll()`
   */
  viewAll: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err, data, res);
    }
    User.viewAll(req.body, callback);
  },


  /**
   * `UserController.view()`
   */
  view: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err, data, res);
    }
    User.view(req.body, callback);
  },

  
};
