/**
 * Created by ChangLiu on 6/16/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);
    
    function WebsiteService() {
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
            "deleteWebsite": deleteWebsite,
            "deleteWebsitesByUser": deleteWebsitesByUser
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
            var newWebsiteId = getNextId();
            var newWebsite = {
                _id: newWebsiteId,
                name: website.name,
                developerId: userId,
                description: website.description
            };
            websites.push(newWebsite);
        }
        
        function findAllWebsitesForUser(userId) {
            var results = [];
            for (var v in websites) {
                if (websites[v].developerId === userId) {
                    results.push(websites[v]);
                }
            }
            return results;
        }

        function findWebsiteById(websiteId) {
            for (var v in websites) {
                if (websites[v]._id === websiteId) {
                    return websites[v];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites[index].name = website.name;
            websites[index].description = website.description;
        }

        function deleteWebsite(websiteId) {
            var oldWebsite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldWebsite);
            websites.splice(index, 1);
        }

        function deleteWebsitesByUser(userId) {
            for (w in websites) {
                var website = websites[w];
                if (website.developerId === userId) {
                    deleteWebsite(website._id);
                }
            }
        }
    }
})();