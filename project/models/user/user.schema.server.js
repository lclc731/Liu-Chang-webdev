/**
 * Created by ChangLiu on 7/19/17.
 */
module.exports = function(mongoose){
    // var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username : {type : String, required : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,
        email : String,
        dateCreated : {
            type : Date,
            default: Date.now
        }


        // websites : [{
        //     type: Schema.Types.ObjectId,
        //     ref : 'Website'
        // }],
        // google: {
        //     id: String,
        //     token: String
        // }

    }, {collection: 'user'});

    return userSchema;
};