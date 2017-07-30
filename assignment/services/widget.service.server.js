/**
 * Created by ChangLiu on 7/6/17.
 */
module.exports = function(app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var widgets = [];


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

    }

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
        var start = req.query.initial;
        var end = req.query.final;

        models
            .widgetModel
            .reorderWidgets(pageId, start, end)
            .then(
                function (status) {
                    res.send(status);
                },
                function (error) {
                    res.sendStatus(400).send("Cannot reorder widgets");
                });
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var url = '/uploads/'+filename;

        console.log("create image1");
        if (widgetId === undefined || widgetId === null || widgetId === '') {
            var widget = {
                type: 'IMAGE',
                url: url,
                width: width
            };
            console.log("create image");
            models
                .widgetModel
                .createWidgetForPage(pageId, widget)
                .then(
                    function (widget) {
                        if(widget){
                            res.json(widget);
                        } else {
                            widget = null;
                            res.send(widget);
                        }
                    }
                    ,
                    function (error) {
                        res.sendStatus(400).send("widget service server, upload error");
                    }
                )
        } else {
            models
                .widgetModel
                .findWidgetById(widgetId)
                .then(
                    function (widget) {
                        widget.url = url;
                        model.updateWidget(widgetId, widget)
                            .then(
                                function (widget) {
                                    res.json(widget);
                                },
                                function (error) {
                                    res.status(400).send("widget service server, updateWidget error");
                                }
                            )
                    },
                    function (error) {
                        res.status(400).send("Cannot find widget by id");
                    }
                )

        }

        var callbackUrl  = "/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        res.redirect(callbackUrl);
        // var widget = {};
        // for (wi in widgets) {
        //     if (parseInt(widgets[wi]._id) === parseInt(widgetId)) {
        //         widget = widgets[wi];
        //         break;
        //     }
        // }
        //
        // widget.url = '/assignment/uploads/' + filename;
        // widget.width = width;
        // var callbackUrl = "/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
        // res.redirect(callbackUrl);
    }
};