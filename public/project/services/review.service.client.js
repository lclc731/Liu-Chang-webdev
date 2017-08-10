/**
 * Created by ChangLiu on 8/9/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {
        var services = {
            "findAllReviewForTrail" : findAllReviewForTrail,
            "createReview" : createReview
        };

        return services;

        function findAllReviewForTrail(trailId) {
            var url = "/api/trail/" + trailId + "/review";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(review) {
            var url = "/api/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();