/**
 * Created by ChangLiu on 6/17/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, name: "GIZZY", text: "GIZMODO"},
            {_id: "234", widgetType: "HEADING", pageId: "100", size: 4, name: "Ippsy", text: "Lorem ipsum"},
            {_id: "345", widgetType: "IMAGE", pageId: "321", name: "Lorem Pixel", text: "Pixel", width: "100%", url: "http://lorempixel.com/400/200/"},
            {_id: "456", widgetType: "HTML", pageId: "321", name: "Ipsy", text: "<p>Lorem ipsum</p>"},
            {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, name: "Lorrro", text: "Lorem ipsum"},
            {_id: "678", widgetType: "YOUTUBE", pageId: "321", name: "Dire Straits", text: "Sultans of Swing", width: "100%", url: "https://www.youtube.com/embed/8Pa9x9fZBtY"},
            {_id: "789", widgetType: "HTML", pageId: "100", name: "Lorem", text: "<p>Lorem ipsum</p>"}
        ];


        var createWidgetMap = {
            'HEADING': createHeaderWidget,
            'IMAGE': createImageWidget,
            'YOUTUBE': createYouTubeWidget,
            'HTML': createHTMLWidget,
            'LINK': createLinkWidget,
            'TEXTINPUT': createTextInputWidget,
            'LABEL': createLabelWidget,
            'BUTTON': createButtonWidget,
            'REPEATER': createRepeaterWidget,
            'DATATABLE': createDataTableWidget
        };

        var services = {
            'createWidget': createWidget,
            'findWidgetsByPageId': findWidgetsByPageId,
            'findWidgetById': findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget,
            'deleteWidgetsByPage': deleteWidgetsByPage
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }

            return widgets.reduce(getMaxId, 0).toString();
        }

        function createHeaderWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HEADING',
                pageId: pageId,
                size: widget.size,
                name: widget.name,
                text: widget.text
            };
        }

        function createLabelWidget(widgetId, pageId, widget) {
        }

        function createHTMLWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'HTML',
                pageId: pageId,
                name: widget.name,
                text: widget.text
            };
        }

        function createTextInputWidget(widgetId, pageId, widget) {

        }

        function createLinkWidget(widgetId, pageId, widget) {

        }

        function createButtonWidget(widgetId, pageId, widget) {

        }

        function createImageWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'IMAGE',
                pageId: pageId,
                width: widget.width,
                url: widget.url,
                name: widget.name,
                text: widget.text
            };

        }

        function createYouTubeWidget(widgetId, pageId, widget) {
            return {
                _id: widgetId,
                widgetType: 'YOUTUBE',
                pageId: pageId,
                name: widget.name,
                text: widget.text,
                width: widget.width,
                url: widget.url
            };

        }

        function createDataTableWidget(widgetId, pageId, widget) {

        }

        function createRepeaterWidget(widgetId, pageId, widget) {

        }


        /*
         * Standard CRUD
         */
        function createWidget(pageId, widget) {
            var newWidgetId = getNextId();
            var newWidget = createWidgetMap[widget.widgetType](newWidgetId, pageId, widget);
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            results = [];
            function filterByPageId(widget) {
                return widget.pageId === pageId;
            }

            results = widgets.filter(filterByPageId);
            return results;
        }

        function findWidgetById(widgetId) {
            for (wid in widgets) {
                var widget = widgets[wid];
                if (widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            if (oldWidget.widgetType != widget.widgetType) {
                return;
            }
            Object.keys(widget).forEach(function (property) {
                if (property === '_id' || property === 'widgetType' || property === 'pageId') {
                    return;
                }
                if (oldWidget.hasOwnProperty(property)) {
                    oldWidget[property] = widget[property];
                }
            });
        }

        function deleteWidget(widgetId) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widgets.splice(index, 1);
        }

        function deleteWidgetsByPage(pageId) {
            for (wid in widgets) {
                widget = widgets[wid];
                if (widget.pageId === pageId) {
                    deleteWidget(widget._id);
                }
            }
        }

        //     var services = {
        //         "getNextId": getNextId,
        //         "createWidget": createWidget,
        //         "findWidgetsByPageId": findWidgetsByPageId,
        //         "findWidgetById": findWidgetById,
        //         "updateWidget": updateWidget,
        //         "deleteWidget": deleteWidget
        //     };
        //     return services
        //
        //     function getNextId() {
        //         function getMaxId(maxId, currentId) {
        //             var current = parseInt(currentId._id);
        //             if (maxId > current) {
        //                 return maxId;
        //             } else {
        //                 return current + 1;
        //             }
        //         }
        //
        //         return widgets.reduce(getMaxId, 0).toString();
        //     }
        //
        //     function createWidget(pageId, widget) {
        //         var newWidget = {
        //             _id: widget._id,
        //             widgetType: widget.widgetType,
        //             pageId: pageId,
        //             size: widget.size,
        //             text: widget.text
        //         };
        //         widgets.push(newWidget);
        //     }
        //
        //     function findWidgetsByPageId(pageId) {
        //         var results = [];
        //         for (wi in widgets) {
        //             var widget = widgets[wi];
        //             if (parseInt(widget.pageId) === parseInt(pageId)) {
        //                 results.push(widget);
        //             }
        //         }
        //         return results;
        //     }
        //
        //     function findWidgetById(widgetId) {
        //         for (wi in widgets) {
        //             var widget = widgets[wi];
        //             if (parseInt(widget._id) === parseInt(widgetId)) {
        //                 return widget;
        //             }
        //         }
        //         return null;
        //     }
        //
        //     function updateWidget(widgetId, widget) {
        //         var oldWidget = findWidgetById(widgetId);
        //         var index = widgets.indexOf(oldWidget);
        //         widgets[index].widgetType = widget.widgetType;
        //         widgets[index].size = widget.size;
        //         widgets[index].text = widget.text;
        //     }
        //
        //     function deleteWidget(widgetId) {
        //         var oldWidget = findWidgetById(widgetId);
        //         var index = widgets.indexOf(oldWidget);
        //         widgets.splice(index, 1);
        //     }
        //
        // }
    }
})();