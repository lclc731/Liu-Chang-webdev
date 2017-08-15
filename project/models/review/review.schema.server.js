/**
 * Created by ChangLiu on 8/9/17.
 */
module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var reviewSchema = new Schema({
        _trail : {type : Schema.Types.ObjectId, ref : 'Trail'},
        _user : {type : Schema.Types.ObjectId, ref : 'User'},
        trailName : String,
        userName : String,
        context : String
    }, {collection: 'review'});

    return reviewSchema;
};