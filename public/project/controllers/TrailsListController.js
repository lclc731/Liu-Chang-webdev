/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsListController", TrailsListController);

    function TrailsListController(TrailsService, $location, $q) {
        var vm = this;
        vm.searchTrail = searchTrail;
        vm.trailView = trailView;
        vm.trails = [];
        var results = [];
        vm.ids = [];

        function searchTrail(city) {
            TrailsService
                .searchTrails(city)
                .then(function (data) {
                    vm.trails = [];
                    results = [];
                    for (var i = 0; i < data.length; i++) {
                        var trail = data[i];
                        var id = trail.unique_id;

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
                        console.log(newTrail);
                        results.push(newTrail);

                    }
                })
                .then(function () {
                    var promises = [];
                    for(var i = 0; i < results.length; i++) {
                        var promise = TrailsService.findTrailByTrailId(results[i].unique_id);
                        promises.push(promise);
                    }

                    $q.all(promises)
                        .then(function(trails) {
                            for (var i = 0; i < trails.length; i++) {
                                if (trails[i]) {
                                    vm.trails.push(trails[i]);
                                } else {
                                    TrailsService
                                        .createTrail(results[i])
                                        .then(
                                            function (newtrail) {
                                                vm.trails.push(newtrail);
                                            });
                                }
                            }
                        });
                });

// $q.all(promises)
            // .then(
            //     function(trail) {
            //         console.log(trail);
            //         if (trail) {
            //             vm.trails.push(trail);
            //             console("1");
            //         } else {
            //             console("2");
            //             TrailsService
            //                 .createTrail(results[i])
            //                 .then(
            //                     function (newtrail) {
            //                         vm.trails.push(newtrail);
            //                     });
            //         }
            //     });
            // for (var i = 0; i < results.length; i++) {
            //     TrailsService
            //         .findTrailByTrailId(results[i].unique_id)
            //         .then(
            //             function(trail) {
            //                 console.log(trail);
            //                 if (trail) {
            //                     vm.trails.push(trail);
            //                     console("1");
            //                 } else {
            //                     console("2");
            //                     TrailsService
            //                         .createTrail(results[i])
            //                         .then(
            //                             function (newtrail) {
            //                                 vm.trails.push(newtrail);
            //                             });
            //
            //                 }
            //             });
            // }


            // for (var i = 0; i < results.length; i++) {
            //     console.log(results[i].unique_id);
            // }

        }

        function trailView(unique_id) {
            $location.url("/trails/" + unique_id);
        }
    }
})();