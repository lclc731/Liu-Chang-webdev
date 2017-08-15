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
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
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
            .when('/admin', {
                templateUrl: "/views/admin.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    admin: checkAdmin
                }
            })
            .when('/profile', {
                templateUrl: "/views/profile.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when('/trails/search/:cityname', {
                templateUrl: "/views/trails-list.html",
                controller: "TrailsListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when('/trails/:trailId', {
                templateUrl: "/views/trails-view.html",
                controller: "TrailsViewController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            });
    }

    var checkAdmin = function($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .checkAdmin()
            .then(function (user) {
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };

    var checkLoggedIn = function($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (user) {
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (user) {
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.resolve(null);
                }
            });
        return deferred.promise;
    };
})();