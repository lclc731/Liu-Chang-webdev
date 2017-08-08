/**
 * Created by ChangLiu on 8/7/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .factory('TrailsService', TrailsService);

    function TrailsService($http) {
        var services = {
            "searchTrails": searchTrails
        };

        return services;

        function searchTrails(city) {
            var url = "/api/search?city=" + city;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();