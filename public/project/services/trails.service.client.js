/**
 * Created by ChangLiu on 8/7/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .factory('TrailsService', TrailsService);

    function TrailsService($http, $sce) {
        var services = {
            "searchTrails" : searchTrails,
            "findTrailByTrailId" : findTrailByTrailId,
            "findTrailByUniqueId" : findTrailByUniqueId,
            "findAllTrailForCity" : findAllTrailForCity,
            // "findUserLike" : findUserLike,
            "findWeatherForTrail" : findWeatherForTrail,
            "createTrail" : createTrail,
            "updateTrail" : updateTrail
        };

        return services;

        function searchTrails(city) {
            var url = "/api/search?city=" + city;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTrailByTrailId(trailId) {
            var url = "/api/trail/" + trailId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTrailByUniqueId(unique_id) {
            var url = "/api/trail/unique/" + unique_id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTrailForCity(city) {
            var url = "/api/city?cityname=" + city;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        // function findUserLike(trailId, userId) {
        //     var url = "/api/trail/" + trailId + "/user/" + userId;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function findWeatherForTrail(lat, lon) {
            var url = "https://api.apixu.com/v1/current.json?key=8f673ddba5f3490aa1284011171408&q=" + lat + "," + lon;
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

        function updateTrail(trailId, trail) {
            var url = "/api/trail/" + trailId;
            return $http.put(url, trail)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();