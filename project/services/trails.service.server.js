/**
 * Created by ChangLiu on 8/7/17.
 */
module.exports = function(app, models) {
    var unirest = require('unirest');
    app.get('/api/search', searchTrail);
    app.get('/api/trail/:unique_id', findTrailByTrailId);

    app.post('/api/trail', createTrail);

    
    function searchTrail(req, res) {
        var city = req.query.city;

        unirest.get("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=" + city)
            .header("X-Mashape-Key", "Ih1ckVsUevmsheQ2urJQIHA46vlEp1t4mMUjsneYlVDpqpHh4v")
            .header("Accept", "text/plain")
            .end(function (result) {
                var places = result.body.places;
                res.send(places);
            });
    }

    function findTrailByTrailId(req, res) {
        var unique_id = req.params.unique_id;
        models
            .trailModel
            .findTrailByTrailId(unique_id)
            .then(
                function (trail) {
                    if (trail) {
                        res.json(trail);
                    } else {
                        res.send(null);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function createTrail(req, res) {
        var newtrail = req.body;
        models
            .trailModel
            .createTrail(newtrail)
            .then(
                function (trail) {
                    res.json(trail);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }

};