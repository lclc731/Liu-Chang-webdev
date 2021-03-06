/**
 * Created by ChangLiu on 8/7/17.
 */
module.exports = function(mongoose){
    var trailSchema = require('./trail.schema.server.js')(mongoose);
    var trailModel = mongoose.model('Trail', trailSchema);

    var api = {
        'createTrail' : createTrail,
        'findTrailByUniqueId' : findTrailByUniqueId,
        'findTrailById' : findTrailById,
        'findAllTrailForCity' : findAllTrailForCity
    };

    return api;

    function createTrail(trail){
        return trailModel.create(trail);
    }

    function findTrailById(trailId){
        return trailModel.findById(trailId);
    }

    function findTrailByUniqueId(unique_id){
        return trailModel.findOne({unique_id : unique_id});
    }

    function findAllTrailForCity(city) {
        return trailModel.find({city : city});
    }
};