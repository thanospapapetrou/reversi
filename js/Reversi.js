class Reversi {
    static #SIZE = 8;

    #board;

    static main() {
        new Reversi();
    }

    constructor() {
        this.#board = new Board(Reversi.#SIZE);
        this.#board[3][3].disk = Color.WHITE;
        this.#board[3][4].disk = Color.BLACK;
        this.#board[4][3].disk = Color.BLACK;
        this.#board[4][4].disk = Color.WHITE;
        console.log(`0 0 ${this.#board[0][0].disk}`);
        console.log(`3 3 ${this.#board[3][3].disk}`);
    }
}
