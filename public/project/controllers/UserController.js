/**
 * Created by ChangLiu on 8/6/17.
 */
(function() {
    angular
        .module("WebAppProject")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            UserService
                .findUserByCredentials(username, password)
            //     .login(username, password)
                .then(
                    function (user) {
                        if (user === null || user === undefined || username === "") {
                            vm.error = "Password is not correct.";
                        } else {
                            $location.url("/profile");
                        }
                    },
                    function (err) {
                        vm.error = "Username does not exist.";
                    });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword, email, accept) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            if (accept !== true) {
                vm.error = "Please accept the terms and conditions.";
                return;
            }

            UserService
                .findUserByUsername(username)
                .then(function (user) {
                    if (user) {
                        vm.error = "Username already exists.";
                    }
                    else {
                        var NewUser = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: email
                        };

                        UserService
                            .createUser(NewUser)
                            .then(function (newuser) {
                                if (newuser) {
                                    $location.url("/profile");
                                }
                            });
                    }
                });
        }
    }

    function ProfileController($location, UserService) {

    }
})();