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
         var model = this;
         model.userId = $routeParams['userId'];
         model.websites = WebsiteService.findAllWebsitesForUser(userId);
     }

     function NewWebsiteController() {
         var model = this;
     }

     function EditWebsiteController() {
         var model = this;
     }
 })();