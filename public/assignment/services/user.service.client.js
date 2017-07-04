/**
 * Created by ChangLiu on 6/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
        ];

        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }

            return users.reduce(getMaxId, 0).toString();
        }

        function createUser(user) {
            var newUserId = getNextId();
            var newUser = {
                _id: newUserId,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            users.push(newUser);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });

        }

        function findUserByUsername(username) {
            for (u in users) {
                var user = users[u];
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function updateUser(userId, user) {
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);
            users[index].firstName = user.firstName;
            users[index].lastName = user.lastName;
            users[index].email = user.email;
        }

        function deleteUser(userId) {
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);
            users.splice(index);
        }
    }
})();