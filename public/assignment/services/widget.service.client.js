/**
 * Created by ChangLiu on 6/17/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService($http) {

        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'deleteWidgetsByPage': deleteWidgetsByPage,
            'reorderWidgets': reorderWidgets
        };
        return services;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidgetsByPage(pageId) {
            for (wid in widgets) {
                widget = widgets[wid];
                if (widget.pageId === pageId) {
                    deleteWidget(widget._id);
                }
            }
        }
        
        function reorderWidgets(pageId, start, end) {
            var url = "/api/page/" + pageId + "/widget?initial=" + start + "&final=" + end;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();