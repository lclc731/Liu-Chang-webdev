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
        vm.ids = [];

        vm.trails = [];
        var results = [];
        var adds = [];
        var haves = [];

        function searchTrail(city) {
            TrailsService
                .searchTrails(city)
                .then(function (data) {
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
                            for (var Trail in trails) {
                                console.log(Trail);
                            }
                            // if (trail !== null && trail !== undefined) {
                            //     console.log(trail);
                            //     haves.push(trail.unique_id);
                            // }
                        })
                        .then(function () {
                            console.log(haves);
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



            // $location.url("/profile");

            // for (var j = 0; j < results.length; j++) {
            //     TrailsService
            //         .findTrailByTrailId(results[j].unique_id)
            //         .then(function (trail) {
            //             if (trail === null) {
            //                 TrailsService
            //                     .createTrail(results[j])
            //                     .then(function (trail) {
            //
            //                     });
            //             }
            //         });
            // }
        }

        function trailView(unique_id) {
            $location.url("/trails/" + unique_id);
        }
    }
})();