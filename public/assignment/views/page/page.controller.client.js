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
        vm.pages = PageService.findPageByWebsiteId(vm.wid);
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
            }
            PageService.createPage(vm.wid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }


    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function updatePage(name, description) {
            var page = {
                name: name,
                description: description
            }
            PageService.updatePage(vm.pid, page);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
        }
    }
})();