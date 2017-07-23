/**
 * Created by ChangLiu on 7/6/17.
 */
module.exports = function(app, models) {
    var multer = require('multer'); // npm install multer save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

    var widgets = [
        {_id: "123", widgetType: "HEADING", pageId: "321", size: 2, name: "GIZZY", text: "GIZMODO"},
        {_id: "234", widgetType: "HEADING", pageId: "100", size: 4, name: "Ippsy", text: "Lorem ipsum"},
        {
            _id: "345",
            widgetType: "IMAGE",
            pageId: "321",
            name: "Lorem Pixel",
            text: "Pixel",
            width: "100%",
            url: "http://lorempixel.com/400/200/"
        },
        {_id: "456", widgetType: "HTML", pageId: "321", name: "Ipsy", text: "<p>Lorem ipsum</p>"},
        {_id: "567", widgetType: "HEADING", pageId: "321", size: 4, name: "Lorrro", text: "Lorem ipsum"},
        {
            _id: "678",
            widgetType: "YOUTUBE",
            pageId: "321",
            name: "Dire Straits",
            text: "Sultans of Swing",
            width: "100%",
            url: "https://www.youtube.com/embed/8Pa9x9fZBtY"
        },
        {_id: "789", widgetType: "HTML", pageId: "100", name: "Lorem", text: "<p>Lorem ipsum</p>"}
    ];


    //POST Calls
    app.post('/api/page/:pageId/widget', createWidget);
    app.post('/api/upload', upload.single('myFile'), uploadImage);

    //GET Calls
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);

    //PUT Calls
    app.put('/api/widget/:widgetId', updateWidget);
    app.put('/api/page/:pageId/widget', reorderWidgets);

    //DELETE Calls
    app.delete('/api/widget/:widgetId', deleteWidget);


    /*API calls implementation*/
    function createWidget(req, res) {
        var pid = req.params.pageId;
        var widget = req.body;

        models
            .widgetModel
            .createWidgetForPage(pid, widget)
            .then(
                function (newWidget){
                    res.json(newWidget);
                },
                function (error){
                    res.sendStatus(400).send(error);
                });

    };

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;

        models
            .widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;

        models
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var widget = req.body;

        models
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;

        models
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function reorderWidgets(req, res) {
        var pageId = req.params.pageId;
        var pageWidgets = [];
        for (wi in widgets) {
            var widget = widgets[wi];
            if (parseInt(widget.pageId) === parseInt(pageId)) {
                pageWidgets.push(widget);
            }
        }
        console.log("begin sort!2");

        var index1 = req.query.initial;
        var index2 = req.query.final;

        var initial = widgets.indexOf(pageWidgets[index1]);
        var final = widgets.indexOf(pageWidgets[index2]);


        if (index1 && index2) {
            if (final >= widgets.length) {
                var k = final - widgets.length;
                while ((k--) + 1) {
                    widgets.push(undefined);
                }
            }
            widgets.splice(final, 0, widgets.splice(initial, 1)[0]);
            res.sendStatus(200);
            return;
        }
        res.status(404).send("Cannot reorder widgets");
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var filename = myFile.filename; // new file name in upload folder
        var path = myFile.path; // full path of uploaded file
        var destination = myFile.destination; // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var widget = {};
        for (wi in widgets) {
            if (parseInt(widgets[wi]._id) === parseInt(widgetId)) {
                widget = widgets[wi];
                break;
            }
        }

        widget.url = '/assignment/uploads/' + filename;
        widget.width = width;
        var callbackUrl = "/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
        res.redirect(callbackUrl);
    }
};