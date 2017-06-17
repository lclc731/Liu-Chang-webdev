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
         vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
     }

     function NewWebsiteController($routeParams, WebsiteService) {
         var vm = this;
         vm.uid = $routeParams.uid;
         vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
     }

     function EditWebsiteController($routeParams, WebsiteService) {
         var vm = this;
         vm.uid = $routeParams.uid;
         vm.websites = WebsiteService.findAllWebsitesForUser(vm.uid);
     }
 })();