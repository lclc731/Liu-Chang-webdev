/**
 * Created by ChangLiu on 6/17/17.
 */
(function () {
    angular
        .module("WebAppMaker")
            .controller("WidgetListController", WidgetListController)
            .controller("NewWidgetController", NewWidgetController)
            .controller("CreateWidgetController", CreateWidgetController)
            .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(function (widgets) {
                vm.widgets = widgets;
            });


        vm.trust = trust;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        vm.sortWidgets = sortWidgets;

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
        
        function sortWidgets(start, end) {
            WidgetService
                .reorderWidgets(vm.pid, start, end)
                .then(function () {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            });

        }
    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        WidgetService
            .findWidgetsByPageId(vm.pid)
            .then(function (widgets) {
                vm.widgets = widgets;
            });
        //vm.futureFeature = futureFeature;
        //vm.featureMissingAlert = null;
    }

    function CreateWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.widgetType = $routeParams.wtype;
        vm.createWidget = createWidget;
        vm.createError = null;

        function createWidget(name, size, width, text, url) {
            if (vm.widgetType === 'IMAGE' || vm.widgetType === 'YOUTUBE') {
                if (url === null || url === undefined) {
                    vm.createError = "Url is required for Image/Youtube";
                    return;
                }
            }
            if (vm.widgetType === 'HEADING') {
                if (text === null || text === undefined) {
                    vm.createError = "Text is required for Header";
                    return;
                }
            }
            var newWidget = {
                name: name,
                text: text,
                type: vm.widgetType,
                size: size,
                width: width,
                url: url
            };
            if (newWidget === null || newWidget === undefined) {
                vm.createError = "no new widget";
                return;
            }
            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        WidgetService
            .findWidgetById(vm.wgid)
            .then(function (widget) {
                vm.widget = widget;
                vm.widgetType = vm.widget.type;
            });

        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;

        function editWidget(name, size, width, text, url) {

            var newWidget = {
                name : name,
                text : text,
                type : vm.widgetType,
                size : size,
                width : width,
                url : url
            };
            WidgetService
                .updateWidget(vm.wgid, newWidget)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                });
        }

    }
})();









// (function () {
//     angular
//         .module("WebAppMaker")
//         .controller('WidgetListController', WidgetListController)
//         .controller('NewWidgetController', NewWidgetController)
//         .controller('EditWidgetController', EditWidgetController);
//
//     function WidgetListController($routeParams, WidgetService, $sce) {
//         var vm = this;
//         vm.uid = $routeParams.uid;
//         vm.wid = $routeParams.wid;
//         vm.pid = $routeParams.pid;
//         vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
//         vm.trust = trust;
//         vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
//
//         function trust(html) {
//             return $sce.trustAsHtml(html);
//         }
//
//         function getYoutubeEmbedUrl(linkUrl) {
//             var embedUrl = "https://www.youtube.com/embed/";
//             var linkUrlParts = linkUrl.split('/');
//             embedUrl += linkUrlParts[linkUrlParts.length - 1];
//             return $sce.trustAsResourceUrl(embedUrl);
//         }
//     }
//
//     function NewWidgetController($routeParams, WidgetService, $location) {
//         var vm = this;
//         vm.uid = $routeParams.uid;
//         vm.wid = $routeParams.wid;
//         vm.pid = $routeParams.pid;
//         vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
//         vm.newHeadingWidget = newHeadingWidget;
//         vm.newImageWidget = newImageWidget;
//         vm.newYoutubeWidget = newYoutubeWidget;
//
//         function newHeadingWidget(pageId) {
//             var widgetId = WidgetService.getNextId();
//             var widget = {
//                 _id: widgetId,
//                 widgetType: "HEADING",
//                 size: "",
//                 text: ""
//             }
//             WidgetService.createWidget(pageId, widget);
//             $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widgetId);
//         }
//
//         function newImageWidget(pageId) {
//             var widget = {
//                 widgetType: "IMAGE"
//             }
//             WidgetService.createWidget(pageId, widget);
//             var Widget = Widgets[Widgets.length - 1];
//             var wgid = Widget._id;
//             $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
//         }
//
//         function newYoutubeWidget(pageId) {
//             var widget = {
//                 widgetType: "YOUTUBE"
//             }
//             WidgetService.createWidget(pageId, widget);
//             var Widget = Widgets[Widgets.length - 1];
//             var wgid = Widget._id;
//             $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + wgid);
//         }
//     }
//
//     function EditWidgetController($routeParams, WidgetService, $sce) {
//         var vm = this;
//         vm.uid = $routeParams.uid;
//         vm.wid = $routeParams.wid;
//         vm.pid = $routeParams.pid;
//         vm.wgid = $routeParams.wgid;
//         vm.findWidgetType = findWidgetType;
//
//         function findWidgetType(widgetId) {
//             var widget = WidgetService.findWidgetById(widgetId);
//             if (widget.widgetType != null) {
//                 return widget.widgetType;
//             } else {
//                 return null;
//             }
//         }
//     }
// })();