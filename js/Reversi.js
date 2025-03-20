class Reversi {
    static #SIZE = 8;

    #board;

    static main() {
        new Reversi();
    }

    constructor() {
        this.#board = new Board(Reversi.#SIZE);
        this.#board[3][3].color = Color.WHITE;
        this.#board[3][4].color = Color.BLACK;
        this.#board[4][3].color = Color.BLACK;
        this.#board[4][4].color = Color.WHITE;
    }
}
