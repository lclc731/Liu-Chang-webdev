 /**
 * Created by ChangLiu on 6/16/17.
 */
 (function () {
    angular
        .module("WebAppMaker")
        .controller('WebsiteListController', WebsiteListController)
        .controller('EditWebsiteController', EditWebsiteController)
        .controller('NewWebsiteController', NewWebsiteController);

     function WebsiteListController(WebsiteService, loggedin) {
         var vm = this;
         vm.uid = loggedin._id;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });
     }

     function NewWebsiteController(WebsiteService, $location, loggedin) {
         var vm = this;
         vm.uid = loggedin._id;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });

         vm.newWebsite = newWebsite;
         function newWebsite(name, description) {
             var website = {
                 name: name,
                 developId: "",
                 description: description
             };
             
             WebsiteService
                 .createWebsite(vm.uid, website)
                 .then(function () {
                     $location.url("/website");
                 })
         }
     }

     function EditWebsiteController($routeParams, WebsiteService, $location, loggedin) {
         var vm = this;
         vm.uid = loggedin._id;
         vm.wid = $routeParams.wid;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });
         WebsiteService
             .findWebsiteById(vm.wid)
             .then(function (website) {
                 vm.website = website;
             });

         vm.updateWebsite = updateWebsite;
         vm.deleteWebsite = deleteWebsite;

         function updateWebsite(website) {
             WebsiteService
                 .updateWebsite(vm.wid, website)
                 .then(function () {
                    $location.url("/website");
             });
         }

         function deleteWebsite(websiteId) {
             WebsiteService
                 .deleteWebsite(websiteId)
                 .then(function () {
                     $location.url("/website");
                 })
         }
     }
 })();