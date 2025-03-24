class Board extends Array {
    static #ELEMENT_CELL = 'td';
    static #ELEMENT_ROW = 'tr';
    static #ELEMENT_TABLE = 'table';
    static #FORMAT_COLUMN = (column) => String.fromCharCode('a'.charCodeAt(0) + column);
    static #FORMAT_ROW = (row) => (row + 1).toString();

    constructor(size) {
        super(size);
        const table = document.createElement(Board.#ELEMENT_TABLE);
        const headerRow = document.createElement(Board.#ELEMENT_ROW);
        headerRow.appendChild(document.createElement(Board.#ELEMENT_CELL));
        for (let j = 0; j < size; j++) {
            const headerCell = document.createElement(Board.#ELEMENT_CELL);
            headerCell.appendChild(document.createTextNode(Board.#FORMAT_COLUMN(j)));
            headerRow.appendChild(headerCell);
        }
        headerRow.appendChild(document.createElement(Board.#ELEMENT_CELL));
        table.appendChild(headerRow);
        for (let i = 0; i < size; i++) {
            this[i] = new Array(size);
            const row = document.createElement(Board.#ELEMENT_ROW);
            const headerColumn = document.createElement(Board.#ELEMENT_CELL);
            headerColumn.appendChild(document.createTextNode(Board.#FORMAT_ROW(i)));
            row.appendChild(headerColumn);
            for (let j = 0; j < size; j++) {
                this[i][j] = new Square(row);
            }
            const footerColumn = document.createElement(Board.#ELEMENT_CELL);
            footerColumn.appendChild(document.createTextNode(Board.#FORMAT_ROW(i)));
            row.appendChild(footerColumn);
            table.appendChild(row);
        }
        const footerRow = document.createElement(Board.#ELEMENT_ROW);
        footerRow.appendChild(document.createElement(Board.#ELEMENT_CELL));
        for (let j = 0; j < size; j++) {
            const footerCell = document.createElement(Board.#ELEMENT_CELL);
            footerCell.appendChild(document.createTextNode(Board.#FORMAT_COLUMN(j)));
            footerRow.appendChild(footerCell);
        }
        footerRow.appendChild(document.createElement(Board.#ELEMENT_CELL));
        table.appendChild(footerRow);
        document.body.appendChild(table);
    }

    reversi(color, next) { // TODO reversi for single player
        const center = this.flatMap((row, i) => row.filter((square, j) => (Math.floor(this.length / 2) - 1 <= i)
                && (i < Math.floor(this.length / 2) + 1) && (Math.floor(this[i].length / 2) - 1 <= j)
                && (j < Math.floor(this[i].length / 2) + 1) && (this[i][j].disk == null)));
        (center.length > 0) ? this.forEach((row) => row.forEach((square) => center.includes(square)
                ? square.enable(color, [], () => this.reversi((color == Color.BLACK) ? Color.WHITE : Color.BLACK,
                next)) : square.disable())) : next();
    }

    othello(color, next) {
        const centerRow = Math.floor(this.length / 2);
        for (let i = centerRow - 1; i < centerRow + 1; i++) {
            const centerColumn = Math.floor(this[i].length / 2);
            for (let j = centerColumn - 1; j < centerColumn + 1; j++) {
                this[i][j].disk = Object.values(Color)[(i + j + 1) % 2];
            }
        }
        next();
    }

    ply(mode, color, ply) {
        const next = (ply == Color.BLACK) ? Color.WHITE : Color.BLACK;
        if ((mode == Mode.SINGLE_PLAYER) && (color != ply)) { // TODO simplify
            for (let i = 0; i < this.length; i++) {
                for (let j = 0; j < this[i].length; j++) {
                    const captures = this.#capture(i, j, ply);
                    if (captures.length > 0) {
                        captures.forEach((capture) => capture.disk = ply); // TODO move to square? It's common with enable
                        this[i][j].disk = ply;
                        return this.ply(mode, color, next);
                    }
                }
            }
        } else {
            for (let i = 0; i < this.length; i++) {
                for (let j = 0; j < this[i].length; j++) {
                    const captures = this.#capture(i, j, ply);
                    (captures.length > 0) ? this[i][j].enable(ply, captures,
                            () => this.ply(mode, color, next)) : this[i][j].disable();
                }
            }
        }
    }

    #capture(row, column, color) {
        if (this[row][column].disk != null) {
            return [];
        }
        const result = [];
        north: for (let i = row - 2; i >= 0; i--) {
            if (this[i][column].disk == color) {
                const captives = [];
                for (let k = row - 1; k > i; k--) {
                    if ((this[k][column].disk == null) || (this[k][column].disk == color)) {
                        break north;
                    }
                    captives.push(this[k][column]);
                }
                result.push(...captives);
            }
        }
        northEast: for (let i = row - 2, j = column + 2; (i >= 0) && (j < this[i].length); i--, j++) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = row - 1, l = column + 1; (k > i) && (l < j); k--, l++) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break northEast;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        east: for (let j = column + 2; j < this[row].length; j++) {
            if (this[row][j].disk == color) {
                const captives = [];
                for (let k = column + 1; k < j; k++) {
                    if ((this[row][k].disk == null) || (this[row][k].disk == color)) {
                        break east;
                    }
                    captives.push(this[row][k]);
                }
                result.push(...captives);
            }
        }
        southEast: for (let i = row + 2, j = column + 2; (i < this.length) && (j < this[i].length); i++, j++) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = row + 1, l = column + 1; (k < i) && (l < j); k++, l++) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break southEast;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        south: for (let i = row + 2; i < this.length; i++) {
            if (this[i][column].disk == color) {
                const captives = [];
                for (let k = row + 1; k < i; k++) {
                    if ((this[k][column].disk == null) || (this[k][column].disk == color)) {
                        break south;
                    }
                    captives.push(this[k][column]);
                }
                result.push(...captives);
            }
        }
        southWest: for (let i = row + 2, j = column - 2; (i < this.length) && (j >= 0); i++, j--) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = row + 1, l = column - 1; (k < i) && (l > j); k++, l--) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break southWest;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        west: for (let j = column - 2; j >= 0; j--) {
            if (this[row][j].disk == color) {
                const captives = [];
                for (let k = column - 1; k > j; k--) {
                    if ((this[row][k].disk == null) || (this[row][k].disk == color)) {
                        break west;
                    }
                    captives.push(this[row][k]);
                }
                result.push(...captives);
            }
        }
        northWest: for (let i = row - 2, j = column - 2; (i >= 0) && (j >= 0); i--, j--) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = row - 1, l = column - 1; (k > i) && (l > j); k--, l--) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break northWest;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        return result;
    }
}
