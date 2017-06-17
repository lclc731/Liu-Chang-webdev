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
        var model = this;
        model.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                model.error = "Username does not exist.";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var model = this;
        model.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                model.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                model.error = "Password does not match.";
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
                model.error = "Username already exists.";
            }
        }
    }

    function ProfileController($routeParams, $location, $timeout, UserService) {
        var model = this;
        model.user = UserService.findUserById($routeParams.userId);
        model.username = model.user.username;
        model.firstName = model.user.firstName;
        model.lastName = model.user.lastName;
        model.email = model.user.email;
        model.updateUser = updateUser;

        function updateUser() {
            var update_user = {
                _id: $routeParams.userId,
                firstName: model.firstName,
                lastName: model.lastName,
                email: model.email
            };
            UserService.updateUser($routeParams.userId, update_user);
            model.updated = "Profile changes saved!";

            $timeout(function () {
                model.updated = null;
            }, 3000);
        }
    }

})();