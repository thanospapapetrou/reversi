class Board extends Array {
    constructor(size) {
        super(size);
        const table = document.createElement(HtmlElement.TABLE);
        const headerRank = document.createElement(HtmlElement.ROW);
        headerRank.appendChild(document.createElement(HtmlElement.CELL));
        for (let j = 0; j < size; j++) {
            const headerCell = document.createElement(HtmlElement.CELL);
            headerCell.appendChild(document.createTextNode(Reversi.FORMAT_FILE(j)));
            headerRank.appendChild(headerCell);
        }
        headerRank.appendChild(document.createElement(HtmlElement.CELL));
        table.appendChild(headerRank);
        for (let i = 0; i < size; i++) {
            this[i] = new Array(size);
            const rank = document.createElement(HtmlElement.ROW);
            const headerFile = document.createElement(HtmlElement.CELL);
            headerFile.appendChild(document.createTextNode(Reversi.FORMAT_RANK(i)));
            rank.appendChild(headerFile);
            for (let j = 0; j < size; j++) {
                this[i][j] = new Square(rank);
            }
            const footerFile = document.createElement(HtmlElement.CELL);
            footerFile.appendChild(document.createTextNode(Reversi.FORMAT_RANK(i)));
            rank.appendChild(footerFile);
            table.appendChild(rank);
        }
        const footerRank = document.createElement(HtmlElement.ROW);
        footerRank.appendChild(document.createElement(HtmlElement.CELL));
        for (let j = 0; j < size; j++) {
            const footerCell = document.createElement(HtmlElement.CELL);
            footerCell.appendChild(document.createTextNode(Reversi.FORMAT_FILE(j)));
            footerRank.appendChild(footerCell);
        }
        footerRank.appendChild(document.createElement(HtmlElement.CELL));
        table.appendChild(footerRank);
        document.body.appendChild(table);
    }

    score(color) {
        let score = 0;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this[i].length; j++) {
                (this[i][j].disk == color) && (score++);
            }
        }
        return score;
    }

    capture(rank, file, color) {
        if (this[rank][file].disk != null) {
            return [];
        }
        const result = [];
        north: for (let i = rank - 2; i >= 0; i--) {
            if (this[i][file].disk == color) {
                const captives = [];
                for (let k = rank - 1; k > i; k--) {
                    if ((this[k][file].disk == null) || (this[k][file].disk == color)) {
                        break north;
                    }
                    captives.push(this[k][file]);
                }
                result.push(...captives);
            }
        }
        northEast: for (let i = rank - 2, j = file + 2; (i >= 0) && (j < this[i].length); i--, j++) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = rank - 1, l = file + 1; (k > i) && (l < j); k--, l++) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break northEast;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        east: for (let j = file + 2; j < this[rank].length; j++) {
            if (this[rank][j].disk == color) {
                const captives = [];
                for (let k = file + 1; k < j; k++) {
                    if ((this[rank][k].disk == null) || (this[rank][k].disk == color)) {
                        break east;
                    }
                    captives.push(this[rank][k]);
                }
                result.push(...captives);
            }
        }
        southEast: for (let i = rank + 2, j = file + 2; (i < this.length) && (j < this[i].length); i++, j++) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = rank + 1, l = file + 1; (k < i) && (l < j); k++, l++) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break southEast;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        south: for (let i = rank + 2; i < this.length; i++) {
            if (this[i][file].disk == color) {
                const captives = [];
                for (let k = rank + 1; k < i; k++) {
                    if ((this[k][file].disk == null) || (this[k][file].disk == color)) {
                        break south;
                    }
                    captives.push(this[k][file]);
                }
                result.push(...captives);
            }
        }
        southWest: for (let i = rank + 2, j = file - 2; (i < this.length) && (j >= 0); i++, j--) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = rank + 1, l = file - 1; (k < i) && (l > j); k++, l--) {
                    if ((this[k][l].disk == null) || (this[k][l].disk == color)) {
                        break southWest;
                    }
                    captives.push(this[k][l]);
                }
                result.push(...captives);
            }
        }
        west: for (let j = file - 2; j >= 0; j--) {
            if (this[rank][j].disk == color) {
                const captives = [];
                for (let k = file - 1; k > j; k--) {
                    if ((this[rank][k].disk == null) || (this[rank][k].disk == color)) {
                        break west;
                    }
                    captives.push(this[rank][k]);
                }
                result.push(...captives);
            }
        }
        northWest: for (let i = rank - 2, j = file - 2; (i >= 0) && (j >= 0); i--, j--) {
            if (this[i][j].disk == color) {
                const captives = [];
                for (let k = rank - 1, l = file - 1; (k > i) && (l > j); k--, l--) {
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
