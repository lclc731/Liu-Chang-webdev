/**
 * Created by ChangLiu on 8/6/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("TrailsViewController", TrailsViewController);

    function TrailsViewController(loggedin, $routeParams, TrailsService, ReviewService, $sce, $location) {
        var vm = this;
        vm.trailId = $routeParams.trailId;
        vm.createReview = createReview;
        vm.currentUser = loggedin;

        TrailsService
            .findTrailByTrailId(vm.trailId)
            .then(function (trail) {
                vm.trail = trail;
                var maphtml = "https://www.google.com/maps/embed/v1/search?key=AIzaSyB7hHsKvA3_Zz28HTPmIdS5dOmHjgM_UMM&q=" + vm.trail.lat + "," + vm.trail.lon;
                vm.mapurl = $sce.trustAsResourceUrl(maphtml);
            });


        ReviewService
            .findAllReviewForTrail(vm.trailId)
            .then(function (reviews) {
                vm.reviews = reviews;
                vm.reviewslength = reviews.length;
            });

        function createReview(context) {
            var review = {
                _trail : vm.trailId,
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