/**
 * Created by ChangLiu on 8/9/17.
 */
module.exports = function(mongoose){
    // var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var reviewSchema = new Schema({

        _trail : String,
        _reviewer : String,
        context : String
    }, {collection: 'review'});

    return reviewSchema;
};