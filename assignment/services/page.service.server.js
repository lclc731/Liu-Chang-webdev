/**
 * Created by ChangLiu on 7/4/17.
 */
var app = require("../../express");

var pages = [
    {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem"},
    {_id: "432", name: "Post 2", websiteId: "456", description: "Lorem"},
    {_id: "543", name: "Post 3", websiteId: "456", description: "Lorem"}
];

//POST Calls
app.post('/api/website/:websiteId/page',createPage);

//GET Calls
app.get('/api/website/:websiteId/page',findAllPagesForWebsite);
app.get('/api/page/:pageId',findPageById);

//PUT Calls
app.put('/api/page/:pageId',updatePage);

//DELETE Calls
app.delete('/api/page/:pageId',deletePage);

