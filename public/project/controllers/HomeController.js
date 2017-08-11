/**
 * Created by ChangLiu on 8/5/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("HomeController", HomeController);

    function HomeController(loggedin) {
        var vm = this;
        vm.currentUser = loggedin;
        // vm.searchTrail = searchTrail;
        //
        // function searchTrail(city) {
        //
        // }
    }
})();