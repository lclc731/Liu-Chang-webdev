/**
 * Created by ChangLiu on 7/19/17.
 */
module.exports = function(mongoose) {
    var pageSchema = require('./page.schema.server')(mongoose);
    var pageModel = mongoose.model('Page', pageSchema);

    var api = {
        'createPageForWebsite' : createPageForWebsite,
        'findAllPagesForWebsite' : findAllPagesForWebsite,
        'findPageById' : findPageById,
        'updatePage' : updatePage,
        'deletePage' : deletePage
    };

    return api;

    // Function Definition Section
    function createPageForWebsite(websiteId, page) {
        page._website = websiteId;
        return pageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return pageModel.find({_website : websiteId});
    }

    function findPageById(pageId) {
        return pageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return pageModel.update({
            _id : pageId
        }, {
            name : page.name,
            description : page.description
        });
    }

    function deletePage(pageId) {
        return pageModel.remove({
            _id : pageId
        });
    }
}