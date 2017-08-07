/**
 * Created by ChangLiu on 8/7/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsSearchController", TrailsSearchController);



    function TrailsSearchController(TrailsService) {

        var vm = this;
        vm.searchTrail = searchTrail;

        function searchTrail(title) {

            TrailsService
                .searchTrails(title)
                .then(function (data) {
                    vm.trails = data;
                });

        }
    }
})();