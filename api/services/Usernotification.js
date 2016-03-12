/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true
  },
  starttime: Date,
  endtime: Date,
  creationtime: Date,
  modificationtime: Date,
  status: String,
});

module.exports = mongoose.model('Usernotification', schema);

var models = {
  //create
  create: function(data, callback) {
    var usernotification = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, callback);
    } else {
      usernotification.save(function(err, data) {
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

  // view by user

  viewByUser: function(data, callback) {
    this.findOne({
      "user": data.user
    }).populate('User').exec(callback);
  },
  findlimited: function(data, callback) {
    var returnData = {};
    var checkfor = new RegExp(data.search, "i");
    var pagesize = parseInt(data.pagesize);
    var pagenumber = parseInt(data.pagenumber);
    async.parallel([
      function(callback) {
        Usernotification.count({
          name: {
            '$regex': checkfor
          }
        }, callback);
      },
      function(callback) {
        Usernotification.find({
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
