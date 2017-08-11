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
                .login(username, password)
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
                        console.log("create");
                        var NewUser = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: email
                        };

                        UserService
                            .register(NewUser)
                            .then(function (newuser) {
                                if (newuser) {
                                    $location.url("/profile");
                                }
                            });
                    }
                });
        }
    }

    function ProfileController(loggedin, $location, UserService, $timeout) {
        var vm = this;
        vm.userId = loggedin._id;
        vm.user = loggedin;
        vm.updateUser = updateUser;
        vm.updatePassword = updatePassword;
        vm.logout = logout;

        function updateUser(user) {
            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function (newUser) {
                        if (newUser) {
                            vm.updated = "Personal profile changes saved!";
                        }
                    });

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }

        function updatePassword(user, password, vpassword) {
            if (password !== vpassword) {
                vm.error = "Password does not match.";

                $timeout(function () {
                    vm.error = null;
                }, 2000);
                return;
            }

            user.password = password;
            UserService
                .updateUser(vm.user._id, user)
                .then(
                    function (newUser) {
                        if (newUser) {
                            vm.updated = "Password change saved!";
                        }
                    });

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }
    }

})();