/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  upload: function(req, res) {
    function callback(err, data) {
      Config.GlobalCallback(err, data, res);
    }
    Config.uploadFile("Z.jpg", callback);
  },
  readFile: function(req, res) {
    Config.readUploaded(req.query.file, res);
  }
};
