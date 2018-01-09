var Game = {
    map: {},
    player: null,
    display: null,

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
    },

    _generateMap: function() {
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function(x, y, value) {
            if (value) { return; }

            var key = x+","+y;
            this.map[key] = ".";
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));


        this._createPlayer(freeCells);

        this._drawWholeMap();
    },

    _createPlayer: function(freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.player = new Player(x, y);
    },

    _drawWholeMap: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
};


var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
};


Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
};

Game.init();
