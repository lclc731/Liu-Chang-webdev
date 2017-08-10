/**
 * Created by ChangLiu on 8/9/17.
 */
module.exports = function(app, models) {

    app.get('/api/trail/:trailId/review', findAllReviewForTrail);


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


};





