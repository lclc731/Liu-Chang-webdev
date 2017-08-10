/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsViewController", TrailsViewController);

    function TrailsViewController($routeParams, TrailsService, $sce) {
        var vm = this;
        var trail_id = $routeParams.unique_id;


        TrailsService
            .findTrailByTrailId(trail_id)
            .then(function (trail) {
                vm.trail = trail;
                var maphtml = "https://www.google.com/maps/embed/v1/search?key=AIzaSyB7hHsKvA3_Zz28HTPmIdS5dOmHjgM_UMM&q=" + vm.trail.lat + "," + vm.trail.lon;
                vm.mapurl = $sce.trustAsResourceUrl(maphtml);
            });



    }
})();