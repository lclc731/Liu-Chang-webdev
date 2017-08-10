/**
 * Created by ChangLiu on 8/6/17.
 */
console.log('server side');
module.exports = function(app){
    var models = require("./models/models.server.js")();
    require("./services/user.service.server.js")(app, models);
    require("./services/trails.service.server.js")(app, models);
    require("./services/review.service.server")(app, models);

};