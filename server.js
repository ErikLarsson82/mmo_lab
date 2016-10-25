var app = require('express')();
var https = require('https').Server(app);
var io = require('socket.io')(https);
var game = require('./game.js');

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

app.get('/game.js', function(req, res){
  res.sendFile(__dirname + '/game.js');
});

app.get('/client_bundle.js', function(req, res){
  res.sendFile(__dirname + '/client_bundle.js');
});

io.on('connection', function(socket){
  var callback = function(status) {
    socket.emit('game status', status);
  }
  var id = game.generateId();
  game.addPlayer(id, callback);
  socket.emit('player id', id);

  socket.on('player move', function(id){
    game.movePlayer(id);
  });

  socket.on('disconnect', function(){});
});

game.init('server');

https.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;