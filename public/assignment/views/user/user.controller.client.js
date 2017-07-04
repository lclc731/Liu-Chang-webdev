/**
 * Created by ChangLiu on 6/14/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error = "Username does not exist.";
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            var user = UserService.findUserByUsername(username);
            if (user === null) {
                user = {
                    username: username,
                    password: password,
                    firstName: "",
                    lastName: "",
                    email: ""
                };
                UserService.createUser(user);
                user = UserService.findUserByUsername(username);
                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Username already exists.";
            }
        }
    }

    function ProfileController($routeParams, $timeout, UserService) {
        var vm = this;
        UserService.findUserById($routeParams.uid)
                   .then(renderUser);

        function renderUser (user) {
            vm.user = user;
        }


        vm.updateUser = updateUser;
        function updateUser() {
            var update_user = {
                _id: $routeParams.uid,
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                email: vm.user.email
            };
            UserService.updateUser($routeParams.uid, update_user);
            vm.updated = "Profile changes saved!";

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }
    }

})();