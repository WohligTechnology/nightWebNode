/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");

var gfs = Grid(mongoose.connections[0].db, mongoose);
gfs.mongo = mongoose.mongo;



module.exports = {
  GlobalCallback: function(err, data, res) {
    if (err) {
      res.json({
        error: err,
        value: false
      });
    } else {
      res.json({
        data: data,
        value: true
      });
    }
  },
  uploadFile: function(filename, callback) {

    var id = mongoose.Types.ObjectId();
    var extension = filename.split(".")[1];
    var newFilename = id + "." + extension;
    var writestream = gfs.createWriteStream({
      filename: newFilename
    });
    fs.createReadStream(filename).pipe(writestream);
    // res.json({name:"Chintan"});
    writestream.on('error', function(err) {
      callback(err, null);
    });
    writestream.on('finish', function() {
      callback(null, {
        name: newFilename
      });
    });
  },
  readUploaded: function(filename, res) {
    var readstream = gfs.createReadStream({
      filename: filename
    });

    //error handling, e.g. file does not exist

    readstream.on('error', function(err) {
      console.log('An error occurred!', err);
      res.json({
        value: false,
        error: err
      });
    });
    readstream.pipe(res);
  }
};
