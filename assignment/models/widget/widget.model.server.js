/**
 * Created by ChangLiu on 7/19/17.
 */
module.exports = function(mongoose, pageModel) {
    var widgetSchema = require('./widget.schema.server')(mongoose);
    var widgetModel = mongoose.model('Widget', widgetSchema);

    var api = {
        'createWidgetForPage' : createWidgetForPage,
        'findAllWidgetsForPage' : findAllWidgetsForPage,
        'findWidgetById' : findWidgetById,
        'updateWidget' : updateWidget,
        'deleteWidget' : deleteWidget,
        'reorderWidgets' : reorderWidgets
    };

    return api;


    function createWidgetForPage(pageId, widget) {
        widget._page = pageId;
        return widgetModel
            .create(widget)
            .then(
                function (widget) {
                    pageModel
                        .insertWidgetToPage(widget._page, widget._id);
                });
    }

    function findAllWidgetsForPage(pageId) {
        return pageModel
            .findPageById(pageId)
            .populate('widgets')
            .then(
                function (page) {
                    return page.widgets;
                });
    }

    function findWidgetById(widgetId) {
        return widgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update({
            _id : widgetId
        }, {
            type: widget.type,
            name: widget.name,
            text: widget.text,
            url: widget.url,
            size: widget.size,
            width: widget.width
        });
    }

    function deleteWidget(widgetId) {
        return widgetModel.remove({
            _id : widgetId
        });
    }

    function reorderWidgets(pageId, start, end) {
        return pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    if (start && end) {
                        if (end >= page.widgets.length) {
                            var k = end - page.widgets.length;
                            while ((k--) + 1) {
                                page.widgets.push(undefined);
                            }
                        }
                        page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
                        page.save();
                    }
                }
            )
    }
};