/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsViewController", TrailsViewController);

    function TrailsViewController(loggedin, $routeParams, TrailsService, ReviewService, $sce, $location) {
        var vm = this;
        var trail_id = $routeParams.unique_id;
        vm.createReview = createReview;
        vm.currentUser = loggedin;


        TrailsService
            .findTrailByTrailId(trail_id)
            .then(function (trail) {
                vm.trail = trail;
                var maphtml = "https://www.google.com/maps/embed/v1/search?key=AIzaSyB7hHsKvA3_Zz28HTPmIdS5dOmHjgM_UMM&q=" + vm.trail.lat + "," + vm.trail.lon;
                vm.mapurl = $sce.trustAsResourceUrl(maphtml);
            });


        ReviewService
            .findAllReviewForTrail(trail_id)
            .then(function (reviews) {
                vm.reviews = reviews;
                vm.reviewslength = reviews.length;
            });

        function createReview(context) {
            var review = {
                _trail : trail_id,
                context : context
            };

            ReviewService
                .createReview(review)
                .then(function (newreview) {
                    // $location.url("/trails/" + trail_id);
                        // TrailsService
                        //     .insertReviewToTrail(newreview)
                        //     .then(function () {
                        //
                        //     })
                    });
        }
    }
})();