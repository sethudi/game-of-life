
class World{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.cells = Array.from({length: this.height}, () => Array.from({length: this.width}, () => false));
        console.log(this.cells);
    }
}

module.exports = World;