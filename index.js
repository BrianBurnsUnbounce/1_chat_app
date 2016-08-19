/**
 * Created by brianburns on 16/08/2016.
 */
var express = require('express');
var io = require('socket.io');

var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res) {
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

io = io.listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port: " + port);



