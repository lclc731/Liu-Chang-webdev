/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsListController", TrailsListController);

    function TrailsListController(TrailsService, $location) {
        var vm = this;
        vm.searchTrail = searchTrail;
        vm.trailView = trailView;

        function searchTrail(city) {
            TrailsService
                .searchTrails(city)
                .then(function (data) {
                    vm.trails = [];
                    for (var i = 0; i < data.length; i++) {
                        var trail = data[i];
                        var id = trail.unique_id;
                        var activity = trail.activities[0];

                        var newTrail = {
                            unique_id : trail.unique_id,
                            name : trail.name,
                            city : trail.city,
                            state : trail.state,
                            country : trail.country,
                            lat : "" + trail.lat,
                            lon : "" + trail.lon,
                            description : activity.description,
                            length : activity.length,
                            url : activity.url,
                            image : activity.thumbnail,
                            likes : 0
                        };
                        // vm.trails.push(trail.unique_id);
                        TrailsService
                            .findTrailByTrailId(id)
                            .then(
                                function(trail) {
                                    if (trail) {
                                        vm.trails.push(trail);
                                    } else {
                                        TrailsService
                                            .createTrail(newTrail)
                                            .then(
                                                function (newtrail) {
                                                    vm.trails.push(newtrail);
                                                });
                                    }
                                });
                    }

                });

        }

        function trailView(unique_id) {
            $location.url("/trails/" + unique_id);
        }
    }
})();