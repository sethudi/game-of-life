
class World{
    constructor(width, height){
        this.columns = width;
        this.rows = height;
        this.cells = Array.from({length: this.rows}, () => Array.from({length: this.columns}, () => false));
        console.log("World Board");
    }

    getCell(x, y) {
        return this.cells[x][y];
    }

    setCell(x, y, status) {
        this.cells[x][y] = status;
    }

    randomize() {
		
		for(let i = 0; i < (this.rows*this.columns)/10; i++) {
			let row = Math.floor(Math.random()*(this.rows));
			let col = Math.floor(Math.random()*(this.columns));
			console.log(this.rows, this.columns, row, col);
			this.setCell(row, col, true);
		}
		
	}
}

module.exports = World;