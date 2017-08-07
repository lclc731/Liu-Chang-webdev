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

        function searchTrails(title) {
            var url = "/api/search?title=" + title;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();