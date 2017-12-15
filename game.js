var Game = {
    display: null,
 
    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
    }
}

Game.map = {};
Game._generateMap = function() {
    var digger = new ROT.Map.Digger();
    var freeCells = [];
 
    var digCallback = function(x, y, value) {
        if (value) { return; } /* do not store walls */
 
        var key = x+","+y;
        freeCells.push(key);
        this.map[key] = ".";
    }
    digger.create(digCallback.bind(this));
 
    this._generateExit(freeCells);
 
    this._drawWholeMap();
};
 
Game._generateExit = function(freeCells) {
	var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
	var key = freeCells.splice(index, 1)[0];
	this.map[key] = ">";
};

Game._drawWholeMap = function() {
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.display.draw(x, y, this.map[key]);
    }
}
