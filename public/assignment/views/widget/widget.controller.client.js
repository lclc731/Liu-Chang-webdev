/**
 * Created by ChangLiu on 6/17/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('WidgetListController', WidgetListController)
        .controller('NewWidgetController', NewWidgetController)
        .controller('EditWidgetController', EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        vm.trust = trust;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        vm.newHeadingWidget = newHeadingWidget;
        vm.newImageWidget = newImageWidget;
        vm.newYoutubeWidget = newYoutubeWidget;

        function newHeadingWidget(pageId) {
            var widget = {
                widgetType: "HEADING"
            }
            WidgetService.createWidget(pageId, widget);
            var Widgets = WidgetService.findWidgetsByPageId(pageId);
            var wgid = Widgets[Widgets.length - 1];
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
        }

        function newImageWidget() {
            var widget = {
                widgetType: "IMAGE"
            }
            WidgetService.createWidget(pageId, widget);
            var Widgets = WidgetService.findWidgetsByPageId(pageId);
            var wgid = Widgets[Widgets.length - 1];
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
        }

        function newYoutubeWidget() {
            var widget = {
                widgetType: "YOUTUBE"
            }
            WidgetService.createWidget(pageId, widget);
            var Widgets = WidgetService.findWidgetsByPageId(pageId);
            var wgid = Widgets[Widgets.length - 1];
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

    }
})();