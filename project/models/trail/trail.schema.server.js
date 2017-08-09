/**
 * Created by ChangLiu on 8/7/17.
 */
module.exports = function(mongoose){
    // var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var trailSchema = new Schema({
        unique_id : {type : String, required : true},
        name : String,
        city : String,
        state : String,
        country : String,
        lat : String,
        lon : S,
        description : String,
        length : String,
        url : String,
        image : String,
        likes : Number

        // websites : [{
        //     type: Schema.Types.ObjectId,
        //     ref : 'Website'
        // }]
    }, {collection: 'trail'});

    return trailSchema;
};