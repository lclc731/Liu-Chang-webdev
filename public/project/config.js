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
                controller: "homeController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl: "/views/login.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when('/register', {
                templateUrl: "/views/register.html",
                controller: "registerController",
                controllerAs: "model"
            });
    }
})();