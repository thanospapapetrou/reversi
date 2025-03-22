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
        this.#board.ply(Color.BLACK);
    }
}
