class Reversi {
    static #SIZE = 8;

    #board;

    static main() {
        new Reversi();
    }

    constructor() {
        this.#board = new Board(Reversi.#SIZE);
        this.#board[3][3].disc = Color.WHITE;
        this.#board[3][4].disc = Color.BLACK;
        this.#board[4][3].disc = Color.BLACK;
        this.#board[4][4].disc = Color.WHITE;
        console.log(`0 0 ${this.#board[0][0].disc}`);
        console.log(`3 3 ${this.#board[3][3].disc}`);
    }
}
