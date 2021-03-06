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
            "createReview" : createReview,
            "deleteReview" : deleteReview,
            "updateReview" : updateReview
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

        function deleteReview(reviewId) {
            var url = "/api/review/" + reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(reviewId, review) {
            var url = "/api/review/" + reviewId;
            return $http.put(url, review)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();