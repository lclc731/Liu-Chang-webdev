/**
 * Created by ChangLiu on 8/7/17.
 */
module.exports = function(app, models) {
    var unirest = require('unirest');
    app.get('/api/search', searchTrail);
    app.get('/api/trail/:trailId', findTrailByTrailId);
    app.get('/api/trail/unique/:unique_id', findTrailByUniqueId);
    app.get('/api/city', findAllTrailForCity);

    app.post('/api/trail', createTrail);

    app.put('/api/trail/:trailId', updateTrail);

    
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
        var trailId = req.params.trailId;
        models
            .trailModel
            .findTrailById(trailId)
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

    function findTrailByUniqueId(req, res) {
        var unique_id = req.params.unique_id;
        models
            .trailModel
            .findTrailByUniqueId(unique_id)
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

    function findAllTrailForCity(req, res) {
        var cityname = req.query.cityname;

        models
            .trailModel
            .findAllTrailForCity(cityname)
            .then(
                function(trails) {
                    res.json(trails);
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

    function updateTrail(req, res) {
        var trailId = req.params.trailId;
        var trail = req.body;
        models
            .trailModel
            .updateTrail(trailId, trail)
            .then(
                function (trail) {
                    res.json(trail);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

};