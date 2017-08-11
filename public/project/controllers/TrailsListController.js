/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsListController", TrailsListController);

    function TrailsListController(loggedin, $routeParams, TrailsService, $location, $q) {
        var vm = this;
        vm.searchTrail = searchTrail;
        vm.trailView = trailView;
        vm.cityname = $routeParams.cityname;
        var results = [];
        vm.currentUser = loggedin;

        TrailsService
            .findAllTrailForCity(vm.cityname)
            .then(
                function (resultTrails) {
                    vm.trails = resultTrails;
                });


        function searchTrail(city) {
            TrailsService
                .searchTrails(city)
                .then(function (data) {
                    results = [];
                    for (var i = 0; i < data.length; i++) {
                        var trail = data[i];
                        var newTrail = {
                            unique_id : trail.unique_id,
                            name : trail.name,
                            city : trail.city,
                            state : trail.state,
                            country : trail.country,
                            lat : trail.lat,
                            lon : trail.lon,
                            description : trail.activities[0].description,
                            length : trail.activities[0].length,
                            url : trail.activities[0].url,
                            image : trail.activities[0].thumbnail,
                            likes : 0
                        };
                        results.push(newTrail);
                    }
                })
                .then(function () {
                    var promises = [];
                    for(var i = 0; i < results.length; i++) {
                        var promise = TrailsService.findTrailByUniqueId(results[i].unique_id);
                        promises.push(promise);
                    }

                    $q.all(promises)
                        .then(function(trails) {
                            for (var i = 0; i < trails.length; i++) {
                                if (!trails[i]) {
                                    TrailsService
                                        .createTrail(results[i])
                                        .then(
                                            function (newtrail) {

                                            });
                                }
                            }
                        })
                        .then(function () {
                            $location.url("/trails/search/" + city);
                        });
                });
        }

        function trailView(trailId) {
            $location.url("/trails/" + trailId);
        }
    }
})();