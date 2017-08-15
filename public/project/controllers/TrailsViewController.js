/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsViewController", TrailsViewController);

    function TrailsViewController(loggedin, $routeParams, TrailsService, ReviewService, $sce, $http) {
        var vm = this;
        vm.trailId = $routeParams.trailId;
        vm.createReview = createReview;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;
        vm.currentUser = loggedin;
        vm.init = init;

        TrailsService
            .findTrailByTrailId(vm.trailId)
            .then(function (trail) {
                vm.trail = trail;
                var maphtml = "https://www.google.com/maps/embed/v1/search?key=AIzaSyB7hHsKvA3_Zz28HTPmIdS5dOmHjgM_UMM&q=" + vm.trail.lat + "," + vm.trail.lon;
                vm.mapurl = $sce.trustAsResourceUrl(maphtml);

                if (vm.trail.lat !== 0 && vm.trail.lon !== 0) {
                    TrailsService
                        .findWeatherForTrail(vm.trail.lat, vm.trail.lon)
                        .then(function (data) {
                            var weather = {
                                cloud : data.current.cloud,
                                humidity : data.current.humidity,
                                time : data.current.last_updated,
                                temp : data.current.temp_f,
                                wind : data.current.wind_mph
                            };
                            vm.weather = weather;
                        });
                }

            });

        function init() {
            findAllReviews();
        }

        init();

        function findAllReviews() {
            ReviewService
                .findAllReviewForTrail(vm.trailId)
                .then(function (reviews) {
                    vm.reviews = reviews;
                    vm.reviewslength = reviews.length;
                });
        }


        function createReview(context) {
            var review = {
                _trail : vm.trailId,
                _user : vm.currentUser._id,
                trailName : vm.trail.name,
                userName : vm.currentUser.username,
                context : context
            };

            ReviewService
                .createReview(review)
                .then(function (review) {
                    if (review) {
                        findAllReviews();
                    }
                    });
        }

        function deleteReview(review) {
            ReviewService
                .deleteReview(review._id)
                .then(function () {
                    findAllReviews();
                });
        }

        function updateReview(review) {
            ReviewService
                .updateReview(review, review._id)
                .then(function () {
                    findAllReviews();
                });
        }
    }
})();