/**
 * Created by ChangLiu on 8/9/17.
 */
module.exports = function(mongoose){
    // var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var reviewSchema = new Schema({
        _trail : {type : Schema.Types.ObjectId, ref : 'Trail'},
        _reviewer : {type : Schema.Types.ObjectId, ref : 'User'},
        context : String

    }, {collection: 'review'});

    return reviewSchema;
};