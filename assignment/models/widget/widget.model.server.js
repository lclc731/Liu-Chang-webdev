/**
 * Created by ChangLiu on 7/19/17.
 */
module.exports = function(mongoose) {
    var widgetSchema = require('./widget.schema.server')(mongoose);
    var widgetModel = mongoose.model('Widget', widgetSchema);

    var api = {
        'createWidgetForPage' : createWidgetForPage,
        'findAllWidgetsForPage' : findAllWidgetsForPage,
        'findWidgetById' : findWidgetById,
        'updateWidget' : updateWidget,
        'deleteWidget' : deleteWidget,
        'reorderWidget' : reorderWidget
    };

    return api;


    function createWidgetForPage(pageId, widget) {
        widget._page = pageId;
        return widgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return widgetModel.find({_page : pageId});
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

    function reorderWidget(pageId, start, end) {

    }
};