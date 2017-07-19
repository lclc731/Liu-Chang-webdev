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
            var user = {
                username: username,
                password: password,
                firstName: "",
                lastName: "",
                email: ""
            }
            UserService
                .createUser(user)
                .then(function (newUser) {
                    $location.url("/user/" + newUser._id);
                });
                // .findUserByUsername(username)
                // .then(
                //     function () {
                //         vm.error = "Username already exists.";
                //     },
                //     function () {
                //         var user = {
                //             username: username,
                //             password: password,
                //             firstName: "",
                //             lastName: "",
                //             email: ""
                //         };
                //         return UserService
                //             .createUser(user);
                //     }
                // )

        }
    }

    function ProfileController($routeParams, $timeout, UserService, $location) {
        var vm = this;
        UserService.findUserById($routeParams.uid)
                   .then(renderUser);

        function renderUser (user) {
            vm.user = user;
        }


        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(user) {

            UserService
                .updateUser(user._id, user)
                .then(function (newUser) {
                $location.url("/user/" + newUser._id);
            });
            vm.updated = "Profile changes saved!";

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url("/login");
                });

        }
    }

})();