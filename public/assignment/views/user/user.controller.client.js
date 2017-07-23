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
                            email: ""
                        }

                        UserService
                            .createUser(NewUser)
                            .then(function (newUser) {
                                if (newUser) {
                                    $location.url("/user/" + newUser._id);
                                }
                            });
                    }
                });
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

        function updateUser(username, email, firstName, lastName) {
            if (username) {
                vm.username = username;
            } else {
                vm.username = vm.user.username;
            }

            var newuser = {
                _id: $routeParams.uid,
                username: vm.username,
                email : email,
                firstName: firstName,
                lastName: lastName
            };

            UserService
                .updateUser(vm.user._id, newuser)
                .then(
                    function (newUser) {
                        if (newUser) {
                            vm.updated = "Profile changes saved!";
                        }
                    });

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