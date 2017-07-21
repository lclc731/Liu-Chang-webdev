/**
 * Created by ChangLiu on 7/4/17.
 */
module.exports = function(app, models) {

    var pages = [
        {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
        {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
        {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
    ];

//POST Calls
    app.post('/api/website/:websiteId/page', createPage);

//GET Calls
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);

//PUT Calls
    app.put('/api/page/:pageId', updatePage);

//DELETE Calls
    app.delete('/api/page/:pageId', deletePage);


    /*API calls implementation*/
    function createPage(req, res) {
        var wid = req.params.websiteId;
        var page = req.body;

        var newPage = {
            _id: new Date().getTime(),
            name: page.name,
            websiteId: wid,
            description: page.description
        };
        pages.push(newPage);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var results = [];

        for (p in pages) {
            var page = pages[p];
            if (parseInt(page.websiteId) === parseInt(wid)) {
                results.push(page);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pid = req.pageId
        var page = null;
        for (p in pages) {
            if (parseInt(page[p]._id) === parseInt(pid)) {
                page = page[p];
                break;
            }
        }
        res.send(page);
    }

    function updatePage(req, res) {
        var pid = req.params.pageId;
        var page = req.body;

        for (p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pid)) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        for (p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pid)) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};