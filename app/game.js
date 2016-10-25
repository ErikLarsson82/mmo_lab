var _ = require('underscore');

function colorRange(id) {
    var colors = [
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#4a586d",
        "#b3add3",
        "#a81dad",
        "#5b525b",
        "#ba825d",
        "#54290d",
        "#dfe8bb",
        "#4f8fb5",
        "#c0e3f7"
    ]
    return colors[id] || "black";
};

var game = {
    init: function(device, canvas, context) {
        this.players = [];
        this.callbacks = [];
        this.context = context;
        this.interval = setInterval(function() {
            this.tick();
        }.bind(this), 1000/60);
    },
    stop: function() {
        clearInterval(this.interval);
    },
    tick: function() {
        _.each(this.players, function(player) {
            player.tick();
        });
        _.each(this.callbacks, function(callback) {
            callback(this.players);
        }.bind(this));

        if (this.context) {
            //Client
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, 800, 600);
            _.each(this.players, function(player) {
                player.draw(this.context);
            }.bind(this));
        }
    },
    newStatus: function(status) {
        this.players.length = 0;
        _.each(status, function(player, idx) {
            var newPlayer = this.generatePlayerFromBlueprint(player);
            this.players.push(newPlayer);
        }.bind(this));
    },
    generateId: function() {
        return this.players.length + 1;
    },
    generatePlayerFromBlueprint: function(playerShell) {
        var decoratedPlayer = _.extend({
            tick: function() {
                if (this.moving) {
                    this.x = this.x + 1;
                    this.moving = false;
                }
            },
            draw: function(context) {
                context.fillStyle = colorRange(this.id);
                context.fillRect(this.x, this.id * 30, 10, 10);
            }
        }, playerShell);
        return decoratedPlayer;
    },
    addPlayer: function(id, callback) {
        var playerShell = {
            x: 0,
            moving: false,
            id: id
        }
        var decoratedPlayer = this.generatePlayerFromBlueprint(playerShell)
        this.players.push(decoratedPlayer);
        if (callback) {
            this.callbacks.push(callback);
        }
        return this.players.length;
    },
    movePlayer: function(id) {
        _.each(this.players, function(player) {
            if (player.id === id) {
                player.moving = true;
            }
        })
    }
}

//Clients
if (typeof window !== "undefined") {
    window.game = game;
}
//Server
if (typeof module !== "undefined") {
    module.exports = game;
}

