const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var messages = [];
var names = [];
var userinfo = [];
// to store data of user
var username;
var fname;
var lname;

var users = [];
var database;
var Client;
//middlewares
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//routing
app.get('/', function(request, response) {
        // response.sendFile(__dirname+'/index.html');
        console.log("api");
    })
    //
    // app.post('/api/login',function(request,response){
    //   console.log(request.body);
    // database.collection('users').find({"email":request.body.email,"password":request.body.password}).toArray(function(err,res){
    // if(users.length){
    // if(users.length){
    // userx.push(user[0]);
    // Client.emit('login',users);
    // // Client.broadcast
    // }
    // response.send({status:1})
    // }else{
    // response.send({staus:0})
    // }
    //
    //   response.send({status:1})
    // })
    // })

app.post('/api/login', function(request, response) {
    console.log(request.body);
    if (request.body.username && request.body.password) {
        database.collection('users').findOne({ "username": request.body.username }, function(err, res) {
            console.log(res);


            if (res) {
                response.send({ status: 1 })
            } else {
                response.send({ status: 0 })

            }
        })
    }
})

// app.post('/api/logout', function(request, response) {
//     console.log(request.body);
//     if (request.body.username && request.body.password) {
//         database.collection('users').findOne({ "username": request.body.username }, function(err, res) {
//             console.log(res);


//             if (res) {
//                 response.send({ status: 1 })
//             } else {
//                 response.send({ status: 0 })

//             }
//         })
//     }
// })



app.get('/users', function(rea, res) {
    console.log("here");
    database.collection('users').find().toArray(function(err, users) {
        if (!err) {
            console.log(users);
            res.send(users);
        } else {
            console.log(err);
        }
    })
})

app.post('/api/register', function(request, response) {
    username = request.body.username;
    fname = request.body.firstname;
    lname = request.body.lastname;

    console.log(request.body);
    if (request.body.username && request.body.firstname &&
        request.body.lastname && request.body.email && request.body.password) {
        var email = request.body.email;
        var uname = request.body.username;

        console.log(uname);

        database.collection('users').findOne({
                $or: [{ "email": email }, ]
            },
            function(err, result) {
                console.log("res", result);
                if (result) {
                    response.send({ status: 0, message: "already exist" })
                } else {
                    database.collection('users').save(request.body, Client, function(err, res) {
                        console.log(res);
                        if (res) {
                            console.log("data sent ");
                            response.send({ status: 1 })
                        } else {
                            console.log(err);
                            response.send({ status: 0, message: "invalid data" })


                        }

                    })
                }


            });





    }
})




app.post('/chat', function(request, response) {
    console.log(request.body.name);
    response.send({ status: 1 })
})

app.get('*', function(request, response) {
        response.send(404);
    })
    //socket
io.on('connection', function(client) {
        Client = client;
        console.log('connection', client.id);

        // if connection lose stream last 10 msg
        // var collection = database.collection('chat messages')
        // var stream = collection.find().sort().limit(10).stream();
        // stream.on('data', function(chat) {
        //     console.log('emit chat');
        //     clinet.emit('chat', chat.content);
        // });

        client.emit('connection', client.id);

        client.emit('message', names);
        client.on('message', function(msg, usr) {
            console.log("massager", msg);
            console.log(usr);

            var collection = database.collection('chat messages');
            collection.insert({
                client_id: Client.id,
                us_name: username,
                firstname: fname,
                lastname: lname,
                content: msg
            })
            names.push(usr + ":" + msg);
            // console.log('name', name);
            client.broadcast.emit('message', names);
            client.emit('message', names);
        })

        client.emit('username', username);

        client.on('username', function(username) {
            var info = database.collection('chat messages')
                .find({ username: username }, { firstname: 1, lastname: 1, _id: 0 })
                // userinfo.push(info)

            client.emit('username', userinfo);


        })

        //   client.emit('message',messages);
        //   client.on('message',function(msg){
        //     // for (var id in names) {
        //     //   if (object.hasOwnProperty(variable)) {
        //     //
        //     //   }
        //     // }()
        //     messages.push({"msg":msg});
        //     console.log(msg);
        //     client.broadcast.emit('message',msg);
        //     client.emit('message',messages);
        //   })
        // })
        // console.log("info", userinfo);
        client.on('getusers', function(username) {
            // console.log('mai', username);
            userinfo.push(username)
                // console.log(userinfo);
            Client.emit('getusers', userinfo);
            Client.broadcast.emit('getusers', userinfo);

        })
        client.on('diconnect', function() {

            console.log('user disconnected :: ', userinfo);
            userinfo.splice(-1, 1);
            client.emit('disconnect', userinfo);

        })
    })
    //connecting db
    // var url = 'mongodb://127.0.0.1:27017/chatdb';
    // MongoClient.connect(url,function(err,db){
    //   database=db;
    //   if(!err){
    //
    //     // console.log(db);
    // console.log("mongo connecting");
    // server.listen(3000,function(){
    //   console.log('working');
    // })
    // }
    // else{
    //   console.log(err);
    // }
    //   db.close();
    // })

var url = 'mongodb://127.0.0.1:27017/chtdb';
MongoClient.connect(url, function(err, db) {
    database = db;
    if (!err) {
        console.log("connect correctly to server");
        //listing
        server.listen(3000, function() {
            console.log("server is working!");
        })

    } else {
        console.log("error");
    }
    // db.close();
})