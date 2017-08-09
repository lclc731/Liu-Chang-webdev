/**
 * Created by ChangLiu on 8/9/17.
 */
module.exports = function(mongoose){
    var reviewSchema = require('./review.schema.server.js')(mongoose);
    var reviewModel = mongoose.model('Review', reviewSchema);

    var api = {
        'createReview' : createReview,
        'findReviewById' : findReviewById,
        'findAllReviewForTrail' : findAllReviewForTrail,
        'findAllReviewForReviewer' : findAllReviewForReviewer,
        'updateReview' : updateReview,
        'deleteReview' : deleteReview
    };

    return api;

    function createReview(review){
        return reviewModel.create(review);
    }

    function findReviewById(reviewId) {
        return reviewModel.findById(reviewId);
    }

    function findAllReviewForTrail(trailId) {
        return reviewModel.find({_trail : trailId});
    }

    function findAllReviewForReviewer(userId) {
        return reviewModel.find({_reviewer : userId});
    }

    function updateReview(reviewId, review) {
        return reviewModel.update({
            _id : reviewId
        }, {
            context : review.context
        });
    }

    function deleteReview(reviewId) {
        return reviewModel.remove({
            _id : reviewId
        });
    }
};