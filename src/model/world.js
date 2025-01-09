
class World{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.cells = Array.from({length: this.height}, () => Array.from({length: this.width}, () => false));
        console.log("World Board");
    }

    getCell(x, y) {
        return this.cells[x][y];
    }

    setCell(x, y, status) {
        this.cells[x][y] = status;
    }
}

module.exports = World;