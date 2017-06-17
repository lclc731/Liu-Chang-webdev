/**
 * Created by ChangLiu on 6/17/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);

    function PageListController($routeParams, PageService) {
        var model = this;
    }
    function NewPageController($routeParams, PageService) {
        var model = this;
    }
    function EditPageController($routeParams, PageService) {
        var model = this;
    }
})();