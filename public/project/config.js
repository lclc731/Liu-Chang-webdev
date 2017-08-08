/**
 * Created by ChangLiu on 8/4/17.
 */
(function(){
    angular
        .module("WebAppProject")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "/views/home.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl: "/views/login.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/register', {
                templateUrl: "/views/register.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/profile', {
                templateUrl: "/views/profile.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when('/trails/list', {
                templateUrl: "/views/trails-list.html",
                controller: "TrailsListController",
                controllerAs: "model"
            })
            .when('/trails/view', {
                templateUrl: "/views/trails-view.html",
                controller: "TrailsViewController",
                controllerAs: "model"
            });
    }
})();