/**
 * Created by ChangLiu on 8/7/17.
 */
module.exports = function(app) {
    var unirest = require('unirest');
    app.get('/api/search', searchTrail);
    
    function searchTrail(req, res) {
        var city = req.query.city;

        unirest.get("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=" + city)
            .header("X-Mashape-Key", "Ih1ckVsUevmsheQ2urJQIHA46vlEp1t4mMUjsneYlVDpqpHh4v")
            .header("Accept", "text/plain")
            .end(function (result) {
                var places = result.body.places;
                // var trails = [];
                // for (place in places) {
                //     trails.push(place.city);
                // }
                res.send(places);
            });
    }
};