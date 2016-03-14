/**
 * Plan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
var lwip = require("lwip");
var MaxImageSize = 1200;

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
    var extension = filename.split(".").pop();
    extension = extension.toLowerCase();
    if (extension == "jpeg") {
      extension = "jpg";
    }
    var newFilename = id + "." + extension;

    var writestream = gfs.createWriteStream({
      filename: newFilename
    });
    var imageStream = fs.createReadStream(filename);

    if (extension == "png" || extension == "jpg" || extension == "gif") {
      lwip.open(filename, extension, function(err, image) {
        var upImage = {
          width: image.width(),
          height: image.height()
        };
        console.log(imageStream);
        if (upImage.width > upImage.height) {
          if (upImage.width > MaxImageSize) {
            image.resize(MaxImageSize, MaxImageSize / (upImage.width / upImage.height), function(err, image2) {
              image2.writeFile(filename, function(err) {
                fs.createReadStream(filename).pipe(writestream);
              });
            });
          } else {
            imageStream.pipe(writestream);
          }
        } else {
          if (upImage.height > MaxImageSize) {
            image.resize((upImage.width / upImage.height) / MaxImageSize, MaxImageSize, function(err, image2) {
              image2.toBuffer(extension, function(err, buffer) {
                fs.createReadStream(filename).pipe(writestream);
              });
            });
          } else {
            imageStream.pipe(writestream);
          }
        }
      });
    } else {
      imageStream.pipe(writestream);
    }





    // stream.read();
    // stream.on('error', function(err) {
    //   console.log(err);
    // });
    // stream.on("end", function() {
    //   console.log("Going Inside");

    // });

    writestream.on('finish', function() {
      callback(null, {
        name: newFilename
      });
      fs.unlink(filename);
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
