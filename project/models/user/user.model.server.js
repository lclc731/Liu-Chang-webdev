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
        'findAllUsers' : findAllUsers,
        'updateUser' : updateUser,
        'deleteUser' : deleteUser,
        'findUserByFacebookId': findUserByFacebookId
    };

    return api;

    // Function Definition Section

    function createUser(user){
        user.roles = ['USER'];
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
    
    function findAllUsers() {
        return userModel.find();
    }

    function updateUser(userId, user){
        return userModel.update({
            _id : userId
        }, {
            password : user.password,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email
        });
    }

    function deleteUser(userId){
        return userModel.remove({
            _id : userId
        });
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }
};