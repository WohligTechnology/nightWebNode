var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
  title: String,
  timestamp: Date,
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true
  },
  content: String,
  status: String
});

module.exports = mongoose.model('Blog', Schema);

var models = {
  //create
  create: function(data, callback) {
    var plan = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, callback);
    } else {
      this.save(function(err, data) {
        if (err) {
          callback(err, false);
        } else {
          callback(null, data);
        }
      });
    }
  },

  // viewall
  viewAll: function(data, callback) {
    this.find().exec(callback);
  },

  //    view one

  view: function(data, callback) {
    this.findOne({
      "_id": data._id
    }).exec(callback);
  },

  // delete

  delete: function(data, callback) {
    this.findOneAndRemove({
      _id: data._id
    }, function(err, data) {

      if (err) {
        callback(err, false);
      } else {
        callback(null, data);
      }
    });
  },
  findlimited: function(data, callback) {
    var returnData = {};
    var checkfor = new RegExp(data.search, "i");
    var pagesize = parseInt(data.pagesize);
    var pagenumber = parseInt(data.pagenumber);
    async.parallel([
      function(callback) {
        this.count({
          name: {
            '$regex': checkfor
          }
        }, callback);
      },
      function(callback) {
        this.find({
          name: {
            '$regex': checkfor
          }
        }, callback);
      }
    ], function(err, data2) {
      if (err) {
        callback(err, null);
      } else {
        returnData.totalpages = Math.ceil(data2[0] / pagesize);
        returnData.total = data2[0];
        returnData.data = data2[1];
        callback(null, returnData);
      }
    });
  },
};
module.exports = _.assign(module.exports, models);
