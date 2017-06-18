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
         vm.wid = $routeParams.wid;
         vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
     }

     function NewWebsiteController($routeParams, WebsiteService, $location) {
         var vm = this;
         vm.uid = $routeParams.uid;
         vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
         vm.newWebsite = newWebsite;

         function newWebsite(name, description) {
             var website = {
                 name: name,
                 developId: "",
                 description: description
             }
             WebsiteService.createWebsite(vm.uid, website);
             $location.url("/user/" + vm.uid + "/website");
         }
     }

     function EditWebsiteController($routeParams, WebsiteService, $location) {
         var vm = this;
         vm.uid = $routeParams.uid;
         vm.wid = $routeParams.wid;
         vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
         vm.updateWebsite = updateWebsite;
         vm.delectWebsite = delectWebsite;

         function updateWebsite(websiteId, name, description) {
             var userid = $routeParams.uid;
             var website = {
                 name: name,
                 developId: "",
                 description: description
             }
             WebsiteService.updateWebsite(websiteId, website);
             $location.url("/user/" + userid + "/website");
         }

         function delectWebsite(websiteId) {
             WebsiteService.deleteWebsite(websiteId);
             var userid = $routeParams.uid;
             $location.url("/user/" + userid + "/website");
         }
     }
 })();