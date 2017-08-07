/**
 * Created by ChangLiu on 7/19/17.
 */
module.exports = function(mongoose){
    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model('User', userSchema);

    var api = {
        'createUser' : createUser,
        'findUserById' : findUserById,
        'findUserByUsername' : findUserByUsername,
        'findUserByCredentials' : findUserByCredentials,
        'updateUser' : updateUser,
        'deleteUser' : deleteUser
    };

    return api;

    // Function Definition Section

    function createUser(user){
        return userModel.create(user);
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }

    function findUserByUsername(username){
        return userModel.findOne({username : username})
    }


    function findUserByCredentials(username, password){
        return userModel.findOne({
            username : username,
            password : password
        });
    }

    function updateUser(userId, user){
        return userModel.update({
            _id : userId
        }, {
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email
        });
    }

    // function removeWebsiteFromUser(userId, websiteId){
    //     // db.user.update({_id : ObjectId("583cf3287ac013080c4adee5")}, {$push : { "websites" : ObjectId("583cf43693b914082152cc3c")}})
    //     userModel
    //         .findById(userId)
    //         .then(
    //             function(user){
    //                 user.websites.pull(websiteId);
    //                 user.save();
    //             },
    //             function(error){
    //                 console.log(error);
    //             }
    //         );
    // }

    // function insertWebsiteToUser(userId, websiteId){
    //     userModel
    //         .findById(userId)
    //         .then(function (user) {
    //             user.websites.push(websiteId);
    //             user.save();
    //         });
    // }

    function deleteUser(userId){
        return userModel.remove({
            _id : userId
        });
    }
};