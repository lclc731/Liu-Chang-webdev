/**
 * Created by ChangLiu on 8/9/17.
 */
module.exports = function(app, models) {

    app.get('/api/trail/:trailId/review', findAllReviewForTrail);
    app.post('/api/review', createReview);
    app.delete('/api/review/:reviewId', deleteReview);


    function findAllReviewForTrail(req, res) {
        var trailId = req.params.trailId;
        models
            .reviewModel
            .findAllReviewForTrail(trailId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function createReview(req, res) {
        var review = req.body;
        models
            .reviewModel
            .createReview(review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        models
            .reviewModel
            .deleteReview(reviewId)
            .then(
                function (status) {
                    res.send(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

};





