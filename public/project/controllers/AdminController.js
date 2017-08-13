/**
 * Created by ChangLiu on 8/12/17.
 */
(function () {
    angular
        .module("WebAppProject")
        .controller("AdminController", AdminController);
    
    function AdminController(UserService, $location) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.init = init;

        function init() {
            findAllUsers();
        }
        init();

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(
                    function (users) {
                        vm.users = users;
                    },
                    function (error) {
                        vm.error = "Cannot find users.";
                    });
        }

        function deleteUser(user) {
            var uid = user._id;
            UserService
                .deleteUser(uid)
                .then(findAllUsers());
        }

    }



})();