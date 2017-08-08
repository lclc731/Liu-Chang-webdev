/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsListController", TrailsListController);

    function TrailsListController(TrailsService) {
        var vm = this;
        vm.searchTrail = searchTrail;

        function searchTrail(city) {

            TrailsService
                .searchTrails(city)
                .then(function (data) {
                    vm.trails = data;
                });

        }
    }
})();