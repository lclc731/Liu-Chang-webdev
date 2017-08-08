/**
 * Created by ChangLiu on 8/7/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .factory('TrailsService', TrailsService);

    function TrailsService($http) {
        var services = {
            "searchTrails" : searchTrails,
            "findTrailByTrailId" : findTrailByTrailId,
            "createTrail" : createTrail
        };

        return services;

        function searchTrails(city) {
            var url = "/api/search?city=" + city;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTrailByTrailId(unique_id) {
            var url = "/api/trail/" + unique_id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createTrail(trail) {
            var url = "/api/trail";
            return $http.post(url, trail)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();