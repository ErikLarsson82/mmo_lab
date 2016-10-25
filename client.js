var game = require('./game.js');


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

game.init('client', canvas, context);

var socket = io();

var id = null;

socket.on('player id', function(_id) {
    console.log('id recieved', _id);
    id = _id;
    //game.addPlayer(id, null);
});

socket.on('game status', function(status) {
    console.log('new game status recieved', status);
    game.newStatus(status);
});

window.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 65:
            socket.emit('player move', id);
        break;
        case 80:
            game.stop();
        break;
    }
});