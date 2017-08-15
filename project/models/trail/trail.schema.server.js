/**
 * Created by ChangLiu on 8/7/17.
 */
module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var trailSchema = new Schema({
        unique_id : {type : String, required : true},
        name : String,
        city : String,
        state : String,
        country : String,
        lat : Number,
        lon : Number,
        description : String,
        length : String,
        url : String,
        image : String

    }, {collection: 'trail'});

    return trailSchema;
};