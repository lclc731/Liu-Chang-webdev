/**
 * Created by ChangLiu on 8/6/17.
 */
/**
 * Created by ChangLiu on 7/19/17.
 */
module.exports = function() {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://webproject:123456@ds149221.mlab.com:49221/heroku_017f0qqm';
    }
    else
    {
        connectionString = 'mongodb://localhost:27017/webproject';
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    mongoose.Promise = require('q').Promise;

    var userModel = require("./user/user.model.server.js")(mongoose, trailModel);
    var trailModel = require("./trail/trail.model.server.js")(mongoose, userModel);
    var reviewModel =  require("./review/review.model.server")(mongoose, trailModel);

    var models = {
        'userModel' : userModel,
        'trailModel' : trailModel,
        'reviewModel' : reviewModel
    };

    return models;

};