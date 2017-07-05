/**
 * Created by ChangLiu on 7/1/17.
 */
var app = require("../../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
];

// GET Calls.
//app.get('/api/user?username=username', findUserByUsername);
app.get('/api/user', findUserAllUser);
app.get('/api/user/:uid', findUserById);

// POST Calls.
app.post('/api/user', createUsers);

// PUT Calls.
app.put('/api/user/:uid', updateUser);

// DELETE Calls.
app.delete('/api/user/:uid', deleteUser);


/*API implementation*/
function createUsers(req, res) {
    var user = req.body;

    var newUser = {
        _id: (new Date()).getTime() + "",
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    users.push(newUser);

    if(newUser){
        res.status(200).send(newUser);
        return;
    } else {
        res.status(500);
        return;
    }
}

function findUserAllUser (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
        var user = users.find(function (u) { return u.username===username && u.password===password  });
        if(user) {
            res.send(user);
            return;
        } else {
            res.send(null);
            return;
        }
    } else if (username) {
        var user = users.find(function (u) { return u.username===username });
        if (user) {
            res.send(user);
            return;
        } else {
            res.status(404);
            return;
        }
    }

}

function findUserById(req, res) {
    var uid = req.params.uid;
    var user = users.find(function (u) { return u._id==uid });
    if(user) {
        res.send(user);
        return;
    } else {
        res.status(404).send("not found!");
        return;
    }
}

function updateUser(req, res) {
    var uid = req.params.uid;
    var new_user = req.body;

    for (u in users){
        var user = users[u];
        if(user._id === uid){
            user.firstName = new_user.firstName;
            user.lastName = new_user.lastName;
            user.email = new_user.email;
            res.status(200).send(user);
            return;
        }
    }
    res.status(404).send("not found!");
}

function deleteUser(req, res) {
    var uid = req.params.uid;

    for (u in users){
        var user = users[u];
        if(user._id === uid){
            users.splice(u,1);
            res.sendStatus(200);
            return;
        }
    }
    res.status(404).send("not found!");
}
