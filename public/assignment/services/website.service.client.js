/**
 * Created by ChangLiu on 6/16/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);
    
    function WebsiteService($http) {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", description: "Test01"},
            {_id: "234", name: "Tweeter", developerId: "456", description: "Test02"},
            {_id: "456", name: "Gizmodo", developerId: "456", description: "Test03"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Test04"},
            {_id: "678", name: "Checkers", developerId: "123", description: "Test05"},
            {_id: "789", name: "Chess", developerId: "234", description: "Test06"}
        ];

        var services = {
            "getNextId": getNextId,
            "createWebsite": createWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
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

            return websites.reduce(getMaxId, 0).toString();
        }

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();