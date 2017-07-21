/**
 * Created by ChangLiu on 7/1/17.
 */
console.log('server side');
module.exports = function(app){
    var models = require("./models/models.server.js")();
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server")(app, models);
    require("./services/widget.service.server")(app, models);
};
// require("../public/assignment/models/models.server");
//
// require("./services/user.service.server.js");
// require("./services/website.service.server.js");
// require("./services/page.service.server.js");
// require("./services/widget.service.server.js");

// var app = require("../express");
//
// module.exports = function (app) {
//
//     require("./services/user.service.server.js");
//     /*require("./services/website.service.server.js")(app);
//      require("./services/page.service.server")(app);
//      require("./services/widget.service.server")(app);*/
// }