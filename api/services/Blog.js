var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    timestamp: Date,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    content: String,
    status: String
});

module.exports = mongoose.model('Blog', schema);

var models = {
    //create
    create: function (data, callback) {
        var obj = this(data);
        obj.timestamp =new Date();
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data, callback);
        } else {
            obj.save(function (err, data) {
                if (err) {
                    callback(err, false);
                } else {
                    callback(null, data);
                }
            });
        }
    },

    // viewall
    viewAll: function (data, callback) {
        this.find().populate("user").sort({ timestamp: -1 }).exec(callback);
    },

    //    view one

    view: function (data, callback) {
        this.findOne({
            "_id": data._id
        }).populate("user").exec(callback);
    },

    // delete

    delete: function (data, callback) {
        this.findOneAndRemove({
            _id: data._id
        }, function (err, data) {

            if (err) {
                callback(err, false);
            } else {
                callback(null, data);
            }
        });
    },
     findlimited: function (data, callback) {
        var returnData = {};
        var checkfor = new RegExp(data.search, "i");
        var pagesize = parseInt(data.pagesize);
        var pagenumber = parseInt(data.pagenumber);
        var sort={};
        data.sortnum=parseInt(data.sortnum);
        sort[data.sort]=data.sortnum;//sort in ascending
        async.parallel([
            function (callback) {
                Blog.count({
                    $or: [{
                        title: {
                            '$regex': checkfor
                        }
                    }, {
                        status: {
                            '$regex': checkfor
                        }
                    }]
                }, callback);
            },
            function (callback) {
                Blog.find({
                    $or: [{
                        title: {
                            '$regex': checkfor
                        }
                    }, {
                        status: {
                            '$regex': checkfor
                        }
                    }]
                },{},{sort:sort}).skip(pagesize*(pagenumber-1)).limit(pagesize).exec(callback);
            }], function (err, data2) {
            if (err) {
                callback(err, null);
            } else {
                returnData.totalpages = Math.ceil(data2[0] / pagesize);
                returnData.total = data2[0];
                returnData.pageno = pagenumber;
                returnData.data = data2[1];
                callback(null, returnData);
            }
        });
    },
};
module.exports = _.assign(module.exports, models);
