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
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        PageService.findPageByWebsiteId(vm.wid)
                   .then(function (pages) {
                       vm.pages = pages;
                   })
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.newPage = newPage;

        function newPage(name, description) {
            var page = {
                name: name,
                description: description
            };
            PageService
                .createPage(vm.wid, page)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
        }
    }


    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        PageService
            .findPageById(vm.pid)
            .then(function (page) {
                vm.page = page;
            });

        function updatePage(page) {
            PageService
                .updatePage(vm.pid, page)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
        }
    }
})();