var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./game.js');

var port = process.env.PORT || 8080;

console.log(__dirname, typeof game);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

app.get('/game.js', function(req, res){
  res.sendFile('/game.js');
});

app.get('/client_bundle.js', function(req, res){
  res.sendFile('/client_bundle.js');
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

http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;