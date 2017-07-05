 /**
 * Created by ChangLiu on 6/16/17.
 */
 (function () {
    angular
        .module("WebAppMaker")
        .controller('WebsiteListController', WebsiteListController)
        .controller('EditWebsiteController', EditWebsiteController)
        .controller('NewWebsiteController', NewWebsiteController);

     function WebsiteListController($routeParams, WebsiteService) {
         var vm = this;
         vm.uid = $routeParams.uid;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });
     }

     function NewWebsiteController($routeParams, WebsiteService, $location) {
         var vm = this;
         vm.uid = $routeParams.uid;
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
             }
             WebsiteService
                 .createWebsite(vm.uid, website)
                 .then(function () {
                     $location.url("/user/" + vm.uid + "/website");
                 })
         }
     }

     function EditWebsiteController($routeParams, WebsiteService, $location) {
         var vm = this;
         vm.uid = $routeParams.uid;
         vm.wid = $routeParams.wid;
         WebsiteService
             .findAllWebsitesForUser(vm.uid)
             .then(function (websites) {
                 vm.websites = websites;
             });
         WebsiteService
             .findWebsiteById(vm.wid)
             .then(function (website) {
                 vm.web = website;
             });

         vm.updateWebsite = updateWebsite;
         vm.deleteWebsite = deleteWebsite;

         function updateWebsite(name, description) {
             var website = {
                 name: name,
                 description: description
             }
             WebsiteService
                 .updateWebsite(vm.wid, website)
                 .then(function () {
                    $location.url("/user/" + vm.uid + "/website");
             })
         }

         function deleteWebsite(websiteId) {
             WebsiteService
                 .deleteWebsite(websiteId)
                 .then(function () {
                     $location.url("/user/" + vm.uid + "/website");
                 })
         }
     }
 })();