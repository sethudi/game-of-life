
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
    clearGrid (){
        this.cells = Array.from({length: this.rows}, () => Array.from({length: this.columns}, () => false));
    }

    next() {
        let buffer = Array.from({length: this.rows}, () => Array.from({length: this.columns}, () => false));

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				let neighbours = this.countNeighbours(row, col);

				/*
				 * If neighbouring cell count < 2, deactivate cell If neighbouring cell count >
				 * 3, deactive cell If neighbouring cell count == 3, activate cell If
				 * neighbouring cell count == 2, don't mess with it
				 */
				let status = false;

				if (neighbours < 2) {
					status = false;
				} else if (neighbours > 3) {
					status = false;
				} else if (neighbours == 3) {
					status = true;
				} else if (neighbours == 2) {
					status = this.getCell(row, col);
				}

				buffer[row][col] = status;
			}
		}

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				this.cells[row][col] = buffer[row][col];
			}
		}

	}
	
	countNeighbours(row, col) {

		let neighbours = 0;

		for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
			for (let colOffset = -1; colOffset <= 1; colOffset++) {

				if (rowOffset == 0 && colOffset == 0) {
					continue;
				}

				let gridRow = row + rowOffset;
				let gridCol = col + colOffset;

				if (gridRow < 0) {
					continue;
				} else if (gridRow == this.rows) {
					continue;
				}

				if (gridCol < 0) {
					continue;
				} else if (gridCol == this.columns) {
					continue;
				}

				let status = this.getCell(gridRow, gridCol);

				if (status) {
					neighbours++;
				}
			}
		}

		return neighbours;
	}
}

module.exports = World;