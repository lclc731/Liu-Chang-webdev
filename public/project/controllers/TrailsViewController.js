/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsViewController", TrailsViewController);

    function TrailsViewController($routeParams, TrailsService, $location) {
        var vm = this;
        var trail_id = $routeParams.unique_id;

        TrailsService
            .findTrailByTrailId(trail_id)
            .then(function (trail) {
                vm.trail = trail;
            });

        vm.mapurl = "";

    }
})();