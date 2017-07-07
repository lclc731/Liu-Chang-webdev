/**
 * Created by ChangLiu on 7/6/17.
 */
var app = require("../../express");

var widgets = [
    {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, name: "GIZZY", text: "GIZMODO"},
    {_id: "234", widgetType: "HEADING", pageId: "100", size: 4, name: "Ippsy", text: "Lorem ipsum"},
    {_id: "345", widgetType: "IMAGE", pageId: "321", name: "Lorem Pixel", text: "Pixel", width: "100%", url: "http://lorempixel.com/400/200/"},
    {_id: "456", widgetType: "HTML", pageId: "321", name: "Ipsy", text: "<p>Lorem ipsum</p>"},
    {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, name: "Lorrro", text: "Lorem ipsum"},
    {_id: "678", widgetType: "YOUTUBE", pageId: "321", name: "Dire Straits", text: "Sultans of Swing", width: "100%", url: "https://www.youtube.com/embed/8Pa9x9fZBtY"},
    {_id: "789", widgetType: "HTML", pageId: "100", name: "Lorem", text: "<p>Lorem ipsum</p>"}
];


//POST Calls
app.post('/api/page/:pageId/widget',createWidget);

//GET Calls
app.get('/api/page/:pageId/widget',findAllWidgetsForPage);
app.get('/api/widget/:widgetId',findWidgetById);

//PUT Calls
app.put('/api/widget/:widgetId',updateWidget);

//DELETE Calls
app.delete('/api/widget/:widgetId',deleteWidget);


/*API calls implementation*/
function createWidget(req, res) {
    var pid = req.params.pageId;
    var widget = req.body;

    var newWidget = {
        _id: new Date().getTime(),
        pageId: pid,
        name: widget.name,
        text: widget.text,
        widgetType: widget.widgetType,
        size: widget.size,
        width: widget.width,
        url: widget.url
    };
    widgets.push(newWidget);

    res.sendStatus(200);
}

function findAllWidgetsForPage(req, res) {
    var pid = req.params.pageId;
    var results = [];
    for (wi in widgets) {
        var widget = widgets[wi];
        if (parseInt(widget.pageId) === parseInt(pid)) {
            results.push(widget);
        }
    }
    res.send(results);
}

function findWidgetById(req, res) {
    var wgid = req.params.widgetId;
    var widget = null;
    for (wi in widgets) {
        if (parseInt(widgets[wi]._id) === parseInt(wgid)) {
            widget = widgets[wi];
            break;
        }
    }
    res.send(widget);
}

function updateWidget(req, res) {
    var wgid = req.params.widgetId;
    var widget = req.body;

    for (wi in widgets) {
        if (parseInt(widgets[wi]._id) === parseInt(wgid)) {
            // if (widgets[wi].widgetType != widget.widgetType) {
            //     res.sendStatus(404);
            // }
            widgets[wi].name=widget.name;
            widgets[wi].text=widget.text;
            widgets[wi].size=widget.size;
            widgets[wi].widgetType != widget.widgetType
            widgets[wi].width=widget.width;
            widgets[wi].url=widget.url;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var wgid = req.params.widgetId;
    for (wi in widgets) {
        if (parseInt(widgets[wi]._id) === parseInt(wgid)) {
            widgets.splice(wi, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}